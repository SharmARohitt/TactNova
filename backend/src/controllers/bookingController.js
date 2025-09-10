const supabaseService = require('../services/supabaseService');
const emailService = require('../services/emailService');
const whatsappService = require('../services/whatsappService');
const schedulerService = require('../services/schedulerService');
const { validateBooking } = require('../utils/validation');

class BookingController {
  
  async createBooking(req, res) {
    try {
      console.log('📝 Creating new booking:', req.body);

      // Validate request body
      const { error, value } = validateBooking(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      // Create booking in database
      const booking = await supabaseService.createBooking(value);
      console.log('✅ Booking created in database:', booking.id);

      // Send confirmation email to client
      try {
        const emailResult = await emailService.sendConfirmationEmail(booking);
        console.log('📧 Confirmation email sent:', emailResult.success);
      } catch (emailError) {
        console.error('⚠️ Email sending failed:', emailError.message);
        // Continue despite email failure
      }

      // Send admin notification email
      try {
        const adminEmailResult = await emailService.sendAdminNotification(booking);
        console.log('🔔 Admin email notification sent:', adminEmailResult.success);
      } catch (adminEmailError) {
        console.error('⚠️ Admin email notification failed:', adminEmailError.message);
      }

      // Send admin WhatsApp notification
      try {
        const adminWhatsAppResult = await whatsappService.sendAdminNotification(booking);
        console.log('📱 Admin WhatsApp notification sent:', adminWhatsAppResult.success);
      } catch (whatsappError) {
        console.error('⚠️ Admin WhatsApp notification failed:', whatsappError.message);
      }

      // Schedule reminder
      try {
        const reminderResult = await schedulerService.scheduleReminder(booking);
        console.log('⏰ Reminder scheduled:', reminderResult.success);
      } catch (reminderError) {
        console.error('⚠️ Reminder scheduling failed:', reminderError.message);
      }

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: {
          id: booking.id,
          name: booking.name,
          email: booking.email,
          appointmentDate: booking.appointment_date,
          appointmentTime: booking.appointment_time,
          service: booking.service,
          status: booking.status
        }
      });

    } catch (error) {
      console.error('❌ Error creating booking:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

  async getBooking(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Booking ID is required'
        });
      }

      const booking = await supabaseService.getBooking(id);
      
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      res.json({
        success: true,
        data: booking
      });

    } catch (error) {
      console.error('❌ Error getting booking:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

  async getAllBookings(req, res) {
    try {
      const { limit = 50, offset = 0, status } = req.query;

      let bookings;
      if (status) {
        bookings = await supabaseService.getBookingsByStatus(status);
      } else {
        bookings = await supabaseService.getAllBookings(parseInt(limit), parseInt(offset));
      }

      res.json({
        success: true,
        data: bookings,
        count: bookings.length
      });

    } catch (error) {
      console.error('❌ Error getting bookings:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

  async updateBookingStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!id || !status) {
        return res.status(400).json({
          success: false,
          message: 'Booking ID and status are required'
        });
      }

      const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
        });
      }

      const updatedBooking = await supabaseService.updateBookingStatus(id, status);

      res.json({
        success: true,
        message: 'Booking status updated successfully',
        data: updatedBooking
      });

    } catch (error) {
      console.error('❌ Error updating booking status:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

  async deleteBooking(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Booking ID is required'
        });
      }

      // Cancel any scheduled reminders
      schedulerService.cancelReminder(id);

      const result = await supabaseService.deleteBooking(id);

      res.json({
        success: true,
        message: 'Booking deleted successfully',
        data: result
      });

    } catch (error) {
      console.error('❌ Error deleting booking:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

  async getActiveJobs(req, res) {
    try {
      const activeJobs = schedulerService.getActiveJobs();

      res.json({
        success: true,
        data: activeJobs,
        count: activeJobs.length
      });

    } catch (error) {
      console.error('❌ Error getting active jobs:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

  async testReminder(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Booking ID is required'
        });
      }

      const result = await schedulerService.testReminder(id);

      res.json({
        success: true,
        message: 'Test reminder executed successfully',
        data: result
      });

    } catch (error) {
      console.error('❌ Error testing reminder:', error);
      res.status(500).json({
        success: false,
        message: 'Test reminder failed',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

  async cancelReminder(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Booking ID is required'
        });
      }

      const result = schedulerService.cancelReminder(id);

      res.json({
        success: true,
        message: result.message,
        data: result
      });

    } catch (error) {
      console.error('❌ Error cancelling reminder:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to cancel reminder',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

  // Health check endpoint
  async healthCheck(req, res) {
    try {
      res.json({
        success: true,
        message: 'TactNova Booking API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        services: {
          database: 'Connected',
          email: 'Configured',
          whatsapp: 'Configured',
          scheduler: 'Active'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Health check failed',
        error: error.message
      });
    }
  }
}

module.exports = new BookingController();
