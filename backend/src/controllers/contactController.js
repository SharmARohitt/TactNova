const supabaseService = require('../services/supabaseService');
const emailService = require('../services/emailService');
const { validateContactMessage, validateContactResponse } = require('../utils/validation');

class ContactController {
  // Create new contact message
  async createMessage(req, res) {
    try {
      console.log('📧 Creating new contact message...');
      
      // Validate input
      const { error, value } = validateContactMessage(req.body);
      if (error) {
        console.error('❌ Validation error:', error.details[0].message);
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }

      const messageData = {
        name: value.name,
        email: value.email,
        phone: value.phone || null,
        company: value.company || null,
        subject: value.subject || 'General Inquiry',
        message: value.message,
        status: 'pending',
        priority: value.priority || 'normal',
        source: 'website'
      };

      // Save to database
      const { data, error: dbError } = await supabaseService.getClient()
        .from('contact_messages')
        .insert([messageData])
        .select()
        .single();

      if (dbError) {
        console.error('❌ Database error:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Failed to save contact message'
        });
      }

      console.log('✅ Contact message saved:', data.id);

      // Send confirmation email to client
      try {
        await emailService.sendContactConfirmation({
          name: data.name,
          email: data.email,
          subject: data.subject,
          messageId: data.id
        });
        console.log('✅ Confirmation email sent to client');
      } catch (emailError) {
        console.error('⚠️ Failed to send confirmation email:', emailError.message);
        // Don't fail the request if email fails
      }

      // Send notification email to admin
      try {
        await emailService.sendAdminContactNotification({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          subject: data.subject,
          message: data.message,
          messageId: data.id,
          priority: data.priority
        });
        console.log('✅ Admin notification email sent');
      } catch (emailError) {
        console.error('⚠️ Failed to send admin notification:', emailError.message);
      }

      res.status(201).json({
        success: true,
        message: 'Contact message sent successfully',
        data: {
          id: data.id,
          status: data.status,
          created_at: data.created_at
        }
      });

    } catch (error) {
      console.error('❌ Contact message creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get all contact messages (admin)
  async getAllMessages(req, res) {
    try {
      const { status, priority, limit = 50, offset = 0 } = req.query;
      
      let query = supabaseService.getClient()
        .from('contact_messages_with_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }
      
      if (priority) {
        query = query.eq('priority', priority);
      }

      const { data, error, count } = await query
        .range(offset, offset + limit - 1)
        .limit(limit);

      if (error) {
        console.error('❌ Database error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch contact messages'
        });
      }

      res.json({
        success: true,
        data: data,
        pagination: {
          total: count,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });

    } catch (error) {
      console.error('❌ Get contact messages error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get single contact message by ID
  async getMessageById(req, res) {
    try {
      const { id } = req.params;

      const { data, error } = await supabaseService.getClient()
        .from('contact_messages_with_responses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ Database error:', error);
        return res.status(404).json({
          success: false,
          message: 'Contact message not found'
        });
      }

      res.json({
        success: true,
        data: data
      });

    } catch (error) {
      console.error('❌ Get contact message error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update contact message status
  async updateMessageStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, admin_notes } = req.body;

      const validStatuses = ['pending', 'in_progress', 'responded', 'closed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status'
        });
      }

      const updateData = { status };
      if (admin_notes) {
        updateData.admin_notes = admin_notes;
      }

      const { data, error } = await supabaseService.getClient()
        .from('contact_messages')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ Database error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to update contact message'
        });
      }

      res.json({
        success: true,
        message: 'Contact message updated successfully',
        data: data
      });

    } catch (error) {
      console.error('❌ Update contact message error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Send meeting request email (admin action)
  async sendMeetingRequest(req, res) {
    try {
      const { id } = req.params;
      const { meetingMessage, preferredTimes } = req.body;

      // Get contact message
      const { data: contactMessage, error } = await supabaseService.getClient()
        .from('contact_messages')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !contactMessage) {
        return res.status(404).json({
          success: false,
          message: 'Contact message not found'
        });
      }

      // Send meeting request email
      await emailService.sendMeetingRequestEmail({
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject,
        originalMessage: contactMessage.message,
        meetingMessage: meetingMessage || 'We would love to discuss your project in detail.',
        preferredTimes: preferredTimes || []
      });

      // Create response record
      await supabaseService.getClient()
        .from('contact_responses')
        .insert([{
          contact_message_id: id,
          response_type: 'meeting_request',
          email_sent: true,
          email_sent_at: new Date().toISOString(),
          notes: meetingMessage
        }]);

      // Update message status
      await supabaseService.getClient()
        .from('contact_messages')
        .update({ 
          status: 'responded',
          responded_at: new Date().toISOString()
        })
        .eq('id', id);

      console.log(`✅ Meeting request sent for contact message ${id}`);

      res.json({
        success: true,
        message: 'Meeting request email sent successfully'
      });

    } catch (error) {
      console.error('❌ Send meeting request error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send meeting request'
      });
    }
  }

  // Delete contact message
  async deleteMessage(req, res) {
    try {
      const { id } = req.params;

      const { error } = await supabaseService.getClient()
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Database error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to delete contact message'
        });
      }

      res.json({
        success: true,
        message: 'Contact message deleted successfully'
      });

    } catch (error) {
      console.error('❌ Delete contact message error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get contact statistics (admin dashboard)
  async getContactStats(req, res) {
    try {
      const { data: stats, error } = await supabaseService.getClient()
        .rpc('get_contact_stats');

      if (error) {
        console.error('❌ Database error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch contact statistics'
        });
      }

      res.json({
        success: true,
        data: stats
      });

    } catch (error) {
      console.error('❌ Get contact stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = new ContactController();
