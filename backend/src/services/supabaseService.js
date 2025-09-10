const { createClient } = require('@supabase/supabase-js');

class SupabaseService {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }

  async createBooking(bookingData) {
    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .insert([{
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          company: bookingData.company,
          service: bookingData.service,
          appointment_date: bookingData.selectedDate,
          appointment_time: bookingData.selectedTime,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  }

  async getBooking(id) {
    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Get booking error:', error);
      throw error;
    }
  }

  async updateBookingStatus(id, status) {
    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Update booking status error:', error);
      throw error;
    }
  }

  async getUpcomingBookings(minutesAhead = 30) {
    try {
      const now = new Date();
      const targetTime = new Date(now.getTime() + minutesAhead * 60000);
      
      const { data, error } = await this.supabase
        .from('bookings')
        .select('*')
        .eq('status', 'confirmed')
        .gte('appointment_date', now.toISOString().split('T')[0])
        .lte('appointment_date', targetTime.toISOString().split('T')[0]);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      // Filter by time for today's appointments
      const filteredBookings = data.filter(booking => {
        const bookingDateTime = new Date(`${booking.appointment_date}T${booking.appointment_time}`);
        const timeDiff = bookingDateTime.getTime() - now.getTime();
        return timeDiff > 0 && timeDiff <= minutesAhead * 60000;
      });

      return filteredBookings;
    } catch (error) {
      console.error('Get upcoming bookings error:', error);
      throw error;
    }
  }

  async getAllBookings(limit = 50, offset = 0) {
    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Get all bookings error:', error);
      throw error;
    }
  }

  async getBookingsByStatus(status) {
    try {
      const { data, error } = await this.supabase
        .from('bookings')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Get bookings by status error:', error);
      throw error;
    }
  }

  async deleteBooking(id) {
    try {
      const { error } = await this.supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return { success: true, message: 'Booking deleted successfully' };
    } catch (error) {
      console.error('Delete booking error:', error);
      throw error;
    }
  }
}

module.exports = new SupabaseService();
