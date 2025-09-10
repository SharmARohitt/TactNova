const express = require('express');
const bookingController = require('../controllers/bookingController');
const contactController = require('../controllers/contactController');
const whatsappService = require('../services/whatsappService');

const router = express.Router();

// Health check
router.get('/health', bookingController.healthCheck);

// Booking routes
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBooking);
router.patch('/bookings/:id/status', bookingController.updateBookingStatus);
router.delete('/bookings/:id', bookingController.deleteBooking);

// Contact routes
router.post('/contact', contactController.createMessage);
router.get('/contacts', contactController.getAllMessages);
router.get('/contacts/:id', contactController.getMessageById);
router.patch('/contacts/:id/status', contactController.updateMessageStatus);
router.post('/contacts/:id/respond', contactController.sendMeetingRequest);
router.delete('/contacts/:id', contactController.deleteMessage);

// Scheduler routes
router.get('/scheduler/jobs', bookingController.getActiveJobs);
router.post('/scheduler/test/:id', bookingController.testReminder);
router.delete('/scheduler/cancel/:id', bookingController.cancelReminder);

// WhatsApp webhook routes
router.get('/webhook/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const verificationResult = whatsappService.verifyWebhook(mode, token, challenge);
  
  if (verificationResult) {
    res.status(200).send(verificationResult);
  } else {
    res.status(403).send('Forbidden');
  }
});

router.post('/webhook/whatsapp', (req, res) => {
  try {
    whatsappService.handleWebhook(req.body);
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error processing webhook');
  }
});

// API documentation endpoint
router.get('/docs', (req, res) => {
  res.json({
    name: 'TactNova Booking API',
    version: '1.0.0',
    description: 'API for managing appointment bookings with automated email and WhatsApp notifications',
    endpoints: {
      'GET /api/health': 'Health check',
      'POST /api/bookings': 'Create new booking',
      'GET /api/bookings': 'Get all bookings (with optional query params: limit, offset, status)',
      'GET /api/bookings/:id': 'Get booking by ID',
      'PATCH /api/bookings/:id/status': 'Update booking status',
      'DELETE /api/bookings/:id': 'Delete booking',
      'POST /api/contact': 'Submit contact form',
      'GET /api/contacts': 'Get all contact messages (with optional query params: limit, offset, status)',
      'GET /api/contacts/:id': 'Get contact message by ID',
      'PATCH /api/contacts/:id/status': 'Update contact status',
      'POST /api/contacts/:id/respond': 'Admin respond to contact message',
      'DELETE /api/contacts/:id': 'Delete contact message',
      'GET /api/scheduler/jobs': 'Get active reminder jobs',
      'POST /api/scheduler/test/:id': 'Test reminder for booking',
      'DELETE /api/scheduler/cancel/:id': 'Cancel reminder for booking',
      'GET /api/webhook/whatsapp': 'WhatsApp webhook verification',
      'POST /api/webhook/whatsapp': 'WhatsApp webhook handler',
      'GET /api/docs': 'API documentation'
    },
    examples: {
      createBooking: {
        method: 'POST',
        url: '/api/bookings',
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          company: 'Example Corp',
          service: 'AI Development',
          selectedDate: '2025-09-15',
          selectedTime: '14:30'
        }
      },
      submitContact: {
        method: 'POST',
        url: '/api/contact',
        body: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1234567890',
          company: 'Tech Startup',
          service: 'Web Development',
          message: 'I need help building a scalable e-commerce platform.'
        }
      },
      updateStatus: {
        method: 'PATCH',
        url: '/api/bookings/{id}/status',
        body: {
          status: 'confirmed'
        }
      },
      adminResponse: {
        method: 'POST',
        url: '/api/contacts/{id}/respond',
        body: {
          adminEmail: 'admin@tactnova.com',
          responseMessage: 'Thank you for your inquiry! We\'d love to discuss your project.',
          followUpAction: 'schedule_call'
        }
      }
    },
    statusCodes: {
      200: 'Success',
      201: 'Created',
      400: 'Bad Request - Validation Error',
      404: 'Not Found',
      500: 'Internal Server Error'
    }
  });
});

module.exports = router;
