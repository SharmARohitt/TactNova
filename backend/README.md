# TactNova Booking Backend API

A comprehensive backend system for managing client appointment bookings with automated email confirmations and WhatsApp reminders.

## 🚀 Features

- **Appointment Booking System** - Complete booking management
- **Email Confirmations** - Automated SendGrid email notifications
- **WhatsApp Reminders** - 30-minute advance reminders via WhatsApp Cloud API
- **Admin Notifications** - Real-time notifications for new bookings
- **Scheduled Reminders** - Cron-based reminder system
- **Data Validation** - Comprehensive input validation
- **Rate Limiting** - API protection and abuse prevention
- **CORS Support** - Cross-origin requests handling
- **Error Handling** - Robust error management

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Email**: SendGrid API (100 emails/day free)
- **Messaging**: WhatsApp Cloud API (1,000 conversations/month free)
- **Scheduler**: Node-cron
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

1. **Node.js 18+** installed
2. **Supabase account** (free tier)
3. **SendGrid account** (free tier: 100 emails/day)
4. **WhatsApp Business API** access (free tier: 1,000 conversations/month)

## 🔧 Installation

1. **Clone and setup**:
```bash
cd backend
npm install
```

2. **Environment Configuration**:
```bash
cp .env.example .env
```

3. **Configure your `.env` file**:
```env
# Server
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_EMAIL=your_admin_email@example.com
FROM_EMAIL=noreply@yourdomain.com

# WhatsApp Cloud API
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_VERIFY_TOKEN=your_verify_token

# Admin Contact
ADMIN_PHONE=+1234567890
ADMIN_WHATSAPP=+1234567890

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

4. **Database Setup**:
   - Execute the SQL schema in `database/schema.sql` in your Supabase SQL Editor

5. **Start the server**:
```bash
npm run dev
```

## 📊 Database Schema

### Bookings Table
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(200) NOT NULL,
    service VARCHAR(50) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔌 API Endpoints

### Health Check
```http
GET /api/health
```

### Bookings
```http
POST   /api/bookings              # Create new booking
GET    /api/bookings              # Get all bookings
GET    /api/bookings/:id          # Get booking by ID
PATCH  /api/bookings/:id/status   # Update booking status
DELETE /api/bookings/:id          # Delete booking
```

### Scheduler
```http
GET    /api/scheduler/jobs        # Get active reminder jobs
POST   /api/scheduler/test/:id    # Test reminder for booking
DELETE /api/scheduler/cancel/:id  # Cancel reminder
```

### WhatsApp Webhook
```http
GET    /api/webhook/whatsapp      # Webhook verification
POST   /api/webhook/whatsapp      # Webhook handler
```

### Documentation
```http
GET    /api/docs                  # API documentation
```

## 📝 API Usage Examples

### Create Booking
```javascript
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Example Corp",
  "service": "AI Development",
  "selectedDate": "2025-09-15",
  "selectedTime": "14:30"
}
```

### Update Status
```javascript
PATCH /api/bookings/{id}/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

## 🔄 Workflow Process

1. **Client submits booking form** → Data stored in Supabase
2. **Immediate notifications**:
   - Confirmation email to client (SendGrid)
   - Admin notification email (SendGrid)
   - Admin WhatsApp notification
3. **Reminder scheduling** → 30-minute advance reminder scheduled
4. **Reminder execution**:
   - WhatsApp reminder to client
   - Email reminder to client
   - Admin meeting notification

## 🧪 Testing

### Test booking creation:
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "company": "Test Company",
    "service": "AI Development",
    "selectedDate": "2025-09-15",
    "selectedTime": "14:30"
  }'
```

### Test reminder:
```bash
curl -X POST http://localhost:5000/api/scheduler/test/{booking_id}
```

## 🚀 Deployment

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`

### Railway Deployment
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Heroku Deployment
1. Create Heroku app
2. Set config vars
3. Deploy via Git

## 🔐 Security Features

- **CORS Protection** - Configurable origin whitelist
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Joi schema validation
- **SQL Injection Protection** - Parameterized queries
- **Helmet Security** - Standard security headers
- **Environment Variables** - Sensitive data protection

## 📊 Monitoring & Logging

- **Health Check Endpoint** - Service status monitoring
- **Comprehensive Logging** - Request/response logging
- **Error Tracking** - Detailed error logs
- **Performance Metrics** - Response time tracking

## 🔧 Configuration Options

### Rate Limiting
```env
RATE_LIMIT_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100    # 100 requests per window
```

### Business Hours Validation
- **Days**: Monday - Friday only
- **Hours**: 9:00 AM - 5:00 PM
- **Intervals**: 30-minute slots

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Check Supabase credentials
   - Verify URL and keys

2. **Email Not Sending**:
   - Verify SendGrid API key
   - Check sender email verification

3. **WhatsApp Not Working**:
   - Verify access token
   - Check phone number ID
   - Ensure webhook is configured

4. **Reminders Not Scheduling**:
   - Check appointment date/time format
   - Verify cron jobs are running

### Debug Mode
```bash
NODE_ENV=development npm run dev
```

## 📈 Performance Tips

1. **Database Indexing** - Already included in schema
2. **Connection Pooling** - Supabase handles automatically
3. **Rate Limiting** - Protects against abuse
4. **Compression** - Enabled for responses
5. **Error Handling** - Prevents server crashes

## 🤝 Support

For issues and questions:
- Create GitHub issues
- Check API documentation at `/api/docs`
- Review logs for error details

## 📄 License

MIT License - see LICENSE file for details.

---

**TactNova Booking Backend** - Powering seamless appointment management with automated notifications.
