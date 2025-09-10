const cron = require('node-cron');
const supabaseService = require('./supabaseService');
const emailService = require('./emailService');
const whatsappService = require('./whatsappService');

class SchedulerService {
  constructor() {
    this.activeJobs = new Map(); // Store scheduled jobs
    this.init();
  }

  init() {
    console.log('🕐 Scheduler Service initialized');
    
    // Check for upcoming appointments every minute
    cron.schedule('* * * * *', () => {
      this.checkUpcomingAppointments();
    });

    // Daily cleanup of completed appointments (runs at midnight)
    cron.schedule('0 0 * * *', () => {
      this.cleanupOldJobs();
    });

    console.log('📅 Cron jobs scheduled successfully');
  }

  async scheduleReminder(booking) {
    try {
      const appointmentDateTime = new Date(`${booking.appointment_date}T${booking.appointment_time}`);
      const reminderTime = new Date(appointmentDateTime.getTime() - 30 * 60000); // 30 minutes before
      const now = new Date();

      console.log(`📅 Scheduling reminder for booking ${booking.id}:`);
      console.log(`  - Appointment: ${appointmentDateTime.toISOString()}`);
      console.log(`  - Reminder: ${reminderTime.toISOString()}`);
      console.log(`  - Current: ${now.toISOString()}`);

      // If reminder time has already passed, don't schedule
      if (reminderTime <= now) {
        console.log(`⚠️ Reminder time has passed for booking ${booking.id}`);
        return { success: false, reason: 'Reminder time has passed' };
      }

      // Calculate delay in milliseconds
      const delay = reminderTime.getTime() - now.getTime();

      // Schedule the reminder
      const timeoutId = setTimeout(async () => {
        try {
          console.log(`⏰ Executing reminder for booking ${booking.id}`);
          await this.executeReminder(booking);
          this.activeJobs.delete(booking.id);
        } catch (error) {
          console.error(`❌ Error executing reminder for booking ${booking.id}:`, error);
        }
      }, delay);

      // Store the job reference
      this.activeJobs.set(booking.id, {
        timeoutId,
        booking,
        scheduledFor: reminderTime,
        type: 'reminder'
      });

      console.log(`✅ Reminder scheduled for booking ${booking.id} in ${Math.round(delay / 1000 / 60)} minutes`);
      return { success: true, scheduledFor: reminderTime, delay };

    } catch (error) {
      console.error('❌ Error scheduling reminder:', error);
      throw error;
    }
  }

  async executeReminder(booking) {
    try {
      console.log(`🚀 Executing reminder for booking ${booking.id}`);

      // Send WhatsApp reminder to client
      const whatsappResult = await whatsappService.sendReminderMessage(booking);
      console.log('📱 WhatsApp reminder sent:', whatsappResult.success);

      // Send email reminder to client
      const emailResult = await emailService.sendReminderEmail(booking);
      console.log('📧 Email reminder sent:', emailResult.success);

      // Send admin notification
      const adminNotification = await whatsappService.sendMeetingStartReminder(booking);
      console.log('🔔 Admin notification sent:', adminNotification.success);

      // Update booking status to 'confirmed' if it was pending
      if (booking.status === 'pending') {
        await supabaseService.updateBookingStatus(booking.id, 'confirmed');
        console.log(`📊 Booking ${booking.id} status updated to confirmed`);
      }

      return {
        success: true,
        whatsapp: whatsappResult,
        email: emailResult,
        adminNotification
      };

    } catch (error) {
      console.error('❌ Error executing reminder:', error);
      throw error;
    }
  }

  async checkUpcomingAppointments() {
    try {
      // Get appointments starting in the next 30 minutes
      const upcomingBookings = await supabaseService.getUpcomingBookings(30);

      for (const booking of upcomingBookings) {
        // Check if we already have a job scheduled for this booking
        if (!this.activeJobs.has(booking.id)) {
          console.log(`📝 Found upcoming appointment: ${booking.id}`);
          await this.scheduleReminder(booking);
        }
      }

    } catch (error) {
      console.error('❌ Error checking upcoming appointments:', error);
    }
  }

  cancelReminder(bookingId) {
    try {
      const job = this.activeJobs.get(bookingId);
      if (job) {
        clearTimeout(job.timeoutId);
        this.activeJobs.delete(bookingId);
        console.log(`🚫 Cancelled reminder for booking ${bookingId}`);
        return { success: true, message: 'Reminder cancelled' };
      }
      return { success: false, message: 'No active reminder found' };
    } catch (error) {
      console.error('❌ Error cancelling reminder:', error);
      throw error;
    }
  }

  cleanupOldJobs() {
    try {
      const now = new Date();
      let cleanedCount = 0;

      for (const [bookingId, job] of this.activeJobs.entries()) {
        // Remove jobs for appointments that have already occurred
        if (job.scheduledFor < now) {
          clearTimeout(job.timeoutId);
          this.activeJobs.delete(bookingId);
          cleanedCount++;
        }
      }

      if (cleanedCount > 0) {
        console.log(`🧹 Cleaned up ${cleanedCount} old reminder jobs`);
      }

    } catch (error) {
      console.error('❌ Error during cleanup:', error);
    }
  }

  getActiveJobs() {
    const jobs = [];
    for (const [bookingId, job] of this.activeJobs.entries()) {
      jobs.push({
        bookingId,
        clientName: job.booking.name,
        scheduledFor: job.scheduledFor,
        type: job.type
      });
    }
    return jobs;
  }

  getJobStatus(bookingId) {
    const job = this.activeJobs.get(bookingId);
    if (job) {
      return {
        exists: true,
        scheduledFor: job.scheduledFor,
        type: job.type,
        clientName: job.booking.name
      };
    }
    return { exists: false };
  }

  // Manual trigger for testing
  async testReminder(bookingId) {
    try {
      const booking = await supabaseService.getBooking(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      console.log(`🧪 Testing reminder for booking ${bookingId}`);
      const result = await this.executeReminder(booking);
      
      return {
        success: true,
        message: 'Test reminder executed successfully',
        result
      };

    } catch (error) {
      console.error('❌ Error testing reminder:', error);
      throw error;
    }
  }
}

module.exports = new SchedulerService();
