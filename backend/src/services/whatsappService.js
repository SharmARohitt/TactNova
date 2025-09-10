const axios = require('axios');

class WhatsAppService {
  constructor() {
    this.baseURL = 'https://graph.facebook.com/v17.0';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  }

  async sendReminderMessage(booking) {
    try {
      const formattedDate = new Date(booking.appointment_date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });

      const formattedTime = this.formatTime(booking.appointment_time);

      // Clean phone number (remove any non-digits except +)
      const cleanPhone = booking.phone.replace(/[^\d+]/g, '');
      
      const messageData = {
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'text',
        text: {
          body: `🚀 Hi ${booking.name}! \n\nReminder: Your TactNova consultation is starting in 30 minutes.\n\n📅 ${formattedDate}\n⏰ ${formattedTime}\n🔧 Service: ${booking.service}\n\nOur team will contact you shortly. Please keep your phone accessible.\n\nLooking forward to our conversation!\n\n— TactNova Team`
        }
      };

      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        messageData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('WhatsApp reminder sent successfully:', response.data);
      return { 
        success: true, 
        messageId: response.data.messages[0].id,
        whatsappId: response.data.messages[0].wamid 
      };

    } catch (error) {
      console.error('WhatsApp API error:', error.response?.data || error.message);
      
      // Log detailed error for debugging
      if (error.response) {
        console.error('WhatsApp API Response Error:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      
      throw new Error(`WhatsApp sending failed: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async sendAdminNotification(booking) {
    try {
      const formattedDate = new Date(booking.appointment_date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });

      const formattedTime = this.formatTime(booking.appointment_time);

      const messageData = {
        messaging_product: 'whatsapp',
        to: process.env.ADMIN_WHATSAPP,
        type: 'text',
        text: {
          body: `🔔 NEW APPOINTMENT ALERT\n\n👤 Client: ${booking.name}\n📧 Email: ${booking.email}\n📱 Phone: ${booking.phone}\n🏢 Company: ${booking.company}\n\n📅 Date: ${formattedDate}\n⏰ Time: ${formattedTime}\n🔧 Service: ${booking.service}\n\n💼 Booking ID: ${booking.id}\n📊 Status: ${booking.status}\n\nPlease confirm this appointment and add to calendar.\n\n— TactNova Booking System`
        }
      };

      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        messageData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Admin WhatsApp notification sent successfully:', response.data);
      return { 
        success: true, 
        messageId: response.data.messages[0].id,
        whatsappId: response.data.messages[0].wamid 
      };

    } catch (error) {
      console.error('Admin WhatsApp notification error:', error.response?.data || error.message);
      throw new Error(`Admin WhatsApp notification failed: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async sendMeetingStartReminder(booking) {
    try {
      const messageData = {
        messaging_product: 'whatsapp',
        to: process.env.ADMIN_WHATSAPP,
        type: 'text',
        text: {
          body: `⏰ MEETING STARTING NOW\n\n👤 Client: ${booking.name}\n📧 Email: ${booking.email}\n📱 Phone: ${booking.phone}\n🏢 Company: ${booking.company}\n🔧 Service: ${booking.service}\n\n💼 Booking ID: ${booking.id}\n\nTime to connect with your client!\n\n— TactNova Booking System`
        }
      };

      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        messageData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Meeting start reminder sent successfully:', response.data);
      return { 
        success: true, 
        messageId: response.data.messages[0].id,
        whatsappId: response.data.messages[0].wamid 
      };

    } catch (error) {
      console.error('Meeting start reminder error:', error.response?.data || error.message);
      throw new Error(`Meeting start reminder failed: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  formatTime(timeString) {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  }

  // Webhook verification for WhatsApp Cloud API
  verifyWebhook(mode, token, challenge) {
    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        console.log('Webhook verified successfully!');
        return challenge;
      } else {
        console.error('Webhook verification failed');
        return null;
      }
    }
    return null;
  }

  // Handle incoming webhook messages
  handleWebhook(body) {
    try {
      if (body.object === 'whatsapp_business_account') {
        body.entry.forEach(entry => {
          entry.changes.forEach(change => {
            if (change.field === 'messages') {
              const messages = change.value.messages;
              if (messages) {
                messages.forEach(message => {
                  console.log('Received WhatsApp message:', message);
                  // Handle incoming messages here if needed
                });
              }
            }
          });
        });
      }
    } catch (error) {
      console.error('Webhook handling error:', error);
    }
  }
}

module.exports = new WhatsAppService();
