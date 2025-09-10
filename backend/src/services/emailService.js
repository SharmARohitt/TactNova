const sgMail = require('@sendgrid/mail');

class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendConfirmationEmail(booking) {
    try {
      const formattedDate = new Date(booking.appointment_date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const formattedTime = this.formatTime(booking.appointment_time);

      const msg = {
        to: booking.email,
        from: {
          email: process.env.FROM_EMAIL,
          name: 'TactNova Team'
        },
        subject: '✅ Your TactNova Appointment is Confirmed',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Appointment Confirmation</title>
            <style>
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .appointment-card { background: white; padding: 25px; border-radius: 10px; border-left: 5px solid #3B82F6; margin: 20px 0; }
              .detail-row { margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .label { font-weight: bold; color: #374151; }
              .value { color: #1f2937; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
              .logo { font-size: 24px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🚀 TACTNOVA</div>
                <h1>Appointment Confirmed!</h1>
                <p>We're excited to connect with you</p>
              </div>
              
              <div class="content">
                <h2>Hi ${booking.name},</h2>
                <p>Thank you for scheduling a consultation with <strong>TactNova</strong>. Your appointment has been successfully confirmed!</p>
                
                <div class="appointment-card">
                  <h3>📅 Appointment Details</h3>
                  <div class="detail-row">
                    <span class="label">Date:</span>
                    <span class="value">${formattedDate}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Time:</span>
                    <span class="value">${formattedTime}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Service:</span>
                    <span class="value">${booking.service}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Company:</span>
                    <span class="value">${booking.company}</span>
                  </div>
                </div>

                <h3>📱 What's Next?</h3>
                <ul>
                  <li>You'll receive a WhatsApp reminder 30 minutes before the meeting</li>
                  <li>Our team will contact you at the scheduled time</li>
                  <li>Have your project requirements ready for discussion</li>
                  <li>Prepare any questions about our services</li>
                </ul>

                <p><strong>Need to reschedule?</strong> Reply to this email or contact us at ${process.env.ADMIN_EMAIL}</p>

                <a href="https://tactnova.vercel.app" class="cta-button">Visit Our Website</a>

                <div class="footer">
                  <p><strong>TactNova</strong><br>
                  Dual-Domain Innovation Platform<br>
                  Email: ${process.env.ADMIN_EMAIL}<br>
                  Phone: ${process.env.ADMIN_PHONE}</p>
                  
                  <p><em>We're looking forward to transforming your vision into reality!</em></p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await sgMail.send(msg);
      console.log('Confirmation email sent successfully:', result[0].statusCode);
      return { success: true, messageId: result[0].headers['x-message-id'] };

    } catch (error) {
      console.error('SendGrid email error:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }

  async sendAdminNotification(booking) {
    try {
      const formattedDate = new Date(booking.appointment_date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const formattedTime = this.formatTime(booking.appointment_time);

      const msg = {
        to: process.env.ADMIN_EMAIL,
        from: {
          email: process.env.FROM_EMAIL,
          name: 'TactNova Booking System'
        },
        subject: `🔔 New Appointment: ${booking.name} - ${formattedDate}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
              .content { background: #f9fafb; padding: 20px; }
              .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
              .label { font-weight: bold; color: #374151; }
              .urgent { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚀 New Appointment Booking</h1>
              </div>
              
              <div class="content">
                <div class="urgent">
                  <strong>⚡ Action Required:</strong> New client appointment needs confirmation
                </div>

                <div class="booking-details">
                  <h3>Client Information</h3>
                  <div class="detail">
                    <span class="label">Name:</span> ${booking.name}
                  </div>
                  <div class="detail">
                    <span class="label">Email:</span> ${booking.email}
                  </div>
                  <div class="detail">
                    <span class="label">Phone:</span> ${booking.phone}
                  </div>
                  <div class="detail">
                    <span class="label">Company:</span> ${booking.company}
                  </div>
                  
                  <h3>Appointment Details</h3>
                  <div class="detail">
                    <span class="label">Date:</span> ${formattedDate}
                  </div>
                  <div class="detail">
                    <span class="label">Time:</span> ${formattedTime}
                  </div>
                  <div class="detail">
                    <span class="label">Service:</span> ${booking.service}
                  </div>
                  <div class="detail">
                    <span class="label">Status:</span> ${booking.status}
                  </div>
                  <div class="detail">
                    <span class="label">Booking ID:</span> ${booking.id}
                  </div>
                </div>

                <p><strong>Next Steps:</strong></p>
                <ol>
                  <li>Review the appointment details</li>
                  <li>Add to your calendar</li>
                  <li>Prepare for the consultation</li>
                  <li>Confirm attendance 1 hour before</li>
                </ol>

                <p><em>This is an automated notification from the TactNova booking system.</em></p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await sgMail.send(msg);
      console.log('Admin notification sent successfully:', result[0].statusCode);
      return { success: true, messageId: result[0].headers['x-message-id'] };

    } catch (error) {
      console.error('Admin notification error:', error);
      throw new Error(`Admin notification failed: ${error.message}`);
    }
  }

  async sendReminderEmail(booking) {
    try {
      const formattedDate = new Date(booking.appointment_date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const formattedTime = this.formatTime(booking.appointment_time);

      const msg = {
        to: booking.email,
        from: {
          email: process.env.FROM_EMAIL,
          name: 'TactNova Team'
        },
        subject: `⏰ Reminder: Your TactNova meeting starts in 30 minutes`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #059669, #3B82F6); color: white; padding: 20px; text-align: center; }
              .content { background: #f0fdf4; padding: 20px; }
              .reminder-box { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⏰ Meeting Reminder</h1>
              </div>
              
              <div class="content">
                <div class="reminder-box">
                  <h2>🚀 Your TactNova meeting starts in 30 minutes!</h2>
                  <p><strong>${formattedDate} at ${formattedTime}</strong></p>
                </div>

                <p>Hi ${booking.name},</p>
                <p>This is a friendly reminder that your consultation with TactNova is starting soon.</p>

                <h3>📋 Quick Checklist:</h3>
                <ul>
                  <li>✅ Have your project requirements ready</li>
                  <li>✅ Prepare questions about our services</li>
                  <li>✅ Keep your phone accessible</li>
                  <li>✅ Find a quiet place for the call</li>
                </ul>

                <p>Our team will contact you at the scheduled time. If you need to reschedule, please contact us immediately at ${process.env.ADMIN_EMAIL}</p>

                <p>Looking forward to our conversation!</p>

                <p><strong>TactNova Team</strong></p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await sgMail.send(msg);
      console.log('Reminder email sent successfully:', result[0].statusCode);
      return { success: true, messageId: result[0].headers['x-message-id'] };

    } catch (error) {
      console.error('Reminder email error:', error);
      throw new Error(`Reminder email failed: ${error.message}`);
    }
  }

  // Contact Form Email Methods
  async sendContactConfirmation(contact) {
    try {
      const msg = {
        to: contact.email,
        from: {
          email: process.env.FROM_EMAIL,
          name: 'TactNova'
        },
        subject: 'Message Received - TactNova Will Be In Touch',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚀 Message Received!</h1>
                <p>Thank you for reaching out to TactNova</p>
              </div>
              <div class="content">
                <p>Hi ${contact.name},</p>
                
                <p>We've successfully received your message and our team is already reviewing it. Here's a copy for your records:</p>
                
                <div class="highlight">
                  <h3>📋 Your Message Details:</h3>
                  <p><strong>Name:</strong> ${contact.name}</p>
                  <p><strong>Email:</strong> ${contact.email}</p>
                  <p><strong>Phone:</strong> ${contact.phone}</p>
                  <p><strong>Company:</strong> ${contact.company}</p>
                  <p><strong>Service Interest:</strong> ${contact.service}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background: white; padding: 15px; border-radius: 5px;">${contact.message}</p>
                </div>

                <h3>🔍 What Happens Next?</h3>
                <ul>
                  <li>✅ Our team will review your requirements within 24 hours</li>
                  <li>📞 We'll reach out to discuss your project in detail</li>
                  <li>💡 You'll receive a customized solution proposal</li>
                  <li>🚀 We'll schedule a consultation call if needed</li>
                </ul>

                <p>In the meantime, feel free to explore our case studies and learn more about how we've helped other businesses achieve their goals.</p>

                <a href="${process.env.FRONTEND_URL}/case-studies" class="button">View Our Case Studies</a>

                <p>If you have any urgent questions, don't hesitate to contact us directly at ${process.env.ADMIN_EMAIL}</p>

                <p><strong>TactNova Team</strong><br>
                Innovating Your Future, Today</p>
              </div>
              <div class="footer">
                <p>© 2024 TactNova. All rights reserved.</p>
                <p>This email was sent because you submitted a contact form on our website.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await sgMail.send(msg);
      console.log('Contact confirmation sent successfully:', result[0].statusCode);
      return { success: true, messageId: result[0].headers['x-message-id'] };

    } catch (error) {
      console.error('Contact confirmation email error:', error);
      throw new Error(`Contact confirmation email failed: ${error.message}`);
    }
  }

  async sendContactAdminNotification(contact) {
    try {
      const msg = {
        to: process.env.ADMIN_EMAIL,
        from: {
          email: process.env.FROM_EMAIL,
          name: 'TactNova Contact System'
        },
        subject: `🔔 New Contact Form Submission - ${contact.service}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 700px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .client-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
              .message-box { background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .action-buttons { text-align: center; margin: 30px 0; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 0 10px; }
              .urgent { background: #ff6b6b; }
              .priority { color: #ff6b6b; font-weight: bold; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔔 New Contact Submission</h1>
                <p>A potential client has reached out through the website</p>
              </div>
              <div class="content">
                <p>Hello TactNova Team,</p>
                
                <p>You have received a new contact form submission. Here are the details:</p>
                
                <div class="client-details">
                  <h3>👤 Client Information</h3>
                  <p><strong>Name:</strong> ${contact.name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
                  <p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
                  <p><strong>Company:</strong> ${contact.company}</p>
                  <p><strong>Service Interest:</strong> <span class="priority">${contact.service}</span></p>
                  <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <div class="message-box">
                  <h3>💬 Client Message</h3>
                  <p>${contact.message}</p>
                </div>

                <h3>🚀 Recommended Next Steps:</h3>
                <ul>
                  <li>Review the client's requirements and service interest</li>
                  <li>Research their company and industry background</li>
                  <li>Prepare relevant case studies and portfolio items</li>
                  <li>Schedule a response within 24 hours for optimal conversion</li>
                </ul>

                <div class="action-buttons">
                  <a href="mailto:${contact.email}?subject=Re: Your TactNova Inquiry - Let's Discuss Your Project&body=Hi ${contact.name},%0A%0AThank you for reaching out to TactNova! I've reviewed your inquiry about ${contact.service} and I'm excited to discuss how we can help bring your vision to life.%0A%0ABased on your message, I believe we have some excellent solutions that could be a perfect fit for ${contact.company}.%0A%0AWould you be available for a brief consultation call this week? I'd love to learn more about your specific requirements and share how our approach could benefit your project.%0A%0APlease let me know your availability, and I'll send over a calendar link.%0A%0ABest regards,%0ATactNova Team" class="button">📧 Quick Reply</a>
                  <a href="tel:${contact.phone}" class="button urgent">📞 Call Now</a>
                </div>

                <p><strong>Remember:</strong> First impressions matter! A quick, personalized response shows professionalism and builds trust with potential clients.</p>

                <p><strong>Contact ID:</strong> ${contact.id}</p>
              </div>
              <div class="footer">
                <p>© 2024 TactNova Contact Management System</p>
                <p>This notification was generated automatically from your website contact form.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await sgMail.send(msg);
      console.log('Admin notification sent successfully:', result[0].statusCode);
      return { success: true, messageId: result[0].headers['x-message-id'] };

    } catch (error) {
      console.error('Admin notification email error:', error);
      throw new Error(`Admin notification email failed: ${error.message}`);
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
      return timeString; // Return original if formatting fails
    }
  }
}

module.exports = new EmailService();
