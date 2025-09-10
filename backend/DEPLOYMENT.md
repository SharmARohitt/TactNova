# Deployment Guide for TactNova Booking Backend

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended for Node.js APIs)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from backend directory
cd backend
vercel --prod
```

**Environment Variables in Vercel:**
- Go to your project dashboard
- Settings → Environment Variables
- Add all variables from `.env.example`

### 2. Railway (Great for databases + APIs)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### 3. Heroku (Classic option)

```bash
# Install Heroku CLI
# Create new app
heroku create tactnova-booking-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
# ... add all other env vars

# Deploy
git push heroku main
```

### 4. Digital Ocean App Platform

1. Connect GitHub repository
2. Select Node.js environment
3. Set environment variables
4. Deploy automatically

## 🔧 Environment Configuration for Production

### Required Environment Variables:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database - Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email - SendGrid (Free tier: 100 emails/day)
SENDGRID_API_KEY=SG.your_api_key
ADMIN_EMAIL=admin@tactnova.com
FROM_EMAIL=noreply@tactnova.com

# WhatsApp Cloud API (Free tier: 1,000 conversations/month)
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_VERIFY_TOKEN=your_verify_token

# Admin Contact
ADMIN_PHONE=+1234567890
ADMIN_WHATSAPP=+1234567890

# CORS (Update with your domain)
ALLOWED_ORIGINS=https://tactnova.com,https://www.tactnova.com
```

## 📊 Database Setup (Supabase)

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note down Project URL and API keys

2. **Execute Database Schema**:
   - Go to SQL Editor in Supabase dashboard
   - Copy and execute `database/schema.sql`
   - Verify tables are created

3. **Set Row Level Security** (Optional but recommended):
   ```sql
   ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
   
   -- Policy for service role (backend API)
   CREATE POLICY "Service role can manage all bookings" ON bookings
   FOR ALL USING (auth.role() = 'service_role');
   ```

## 📧 SendGrid Setup

1. **Create SendGrid Account**:
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Free tier: 100 emails/day

2. **Generate API Key**:
   - Settings → API Keys
   - Create API Key with "Full Access"
   - Copy the key to your environment variables

3. **Verify Sender Email**:
   - Settings → Sender Authentication
   - Verify your FROM_EMAIL address

## 📱 WhatsApp Cloud API Setup

1. **Create Meta Developer Account**:
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create new app → Business type

2. **Setup WhatsApp Cloud API**:
   - Add WhatsApp product to your app
   - Get temporary access token
   - Note Phone Number ID

3. **Configure Webhook** (for production):
   ```
   Webhook URL: https://your-domain.com/api/webhook/whatsapp
   Verify Token: your_verify_token (set in env)
   ```

## 🔗 Frontend Integration

Update your frontend to use the deployed backend:

```typescript
// In your frontend env file
VITE_API_URL=https://your-backend-domain.com/api

// In your booking service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createBooking = async (bookingData: BookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create booking');
  }
  
  return response.json();
};
```

## 🧪 Testing Your Deployment

### 1. Health Check
```bash
curl https://your-domain.com/api/health
```

### 2. Create Test Booking
```bash
curl -X POST https://your-domain.com/api/bookings \
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

### 3. Test Email Functionality
- Create a booking with your email
- Check if confirmation email arrives
- Verify admin notification email

### 4. Test WhatsApp (if configured)
- Create a booking
- Check admin WhatsApp notification
- Test reminder functionality

## 🔐 Security Checklist for Production

- [ ] Environment variables properly set
- [ ] CORS configured with your domain
- [ ] Rate limiting enabled
- [ ] Database RLS policies (if using Supabase)
- [ ] HTTPS enabled
- [ ] API keys secured
- [ ] Webhook endpoints secured
- [ ] Error messages don't expose sensitive data

## 📊 Monitoring & Maintenance

### Health Monitoring
Set up monitoring for:
- `/api/health` endpoint
- Database connectivity
- Email delivery rates
- WhatsApp API quotas

### Log Monitoring
Check logs for:
- Failed booking attempts
- Email sending errors
- WhatsApp API errors
- Database connection issues

### Scheduled Maintenance
- Monitor API quotas (SendGrid, WhatsApp)
- Clean up old bookings periodically
- Update dependencies regularly
- Backup database regularly

## 🆘 Troubleshooting Common Issues

### CORS Errors
```javascript
// Update ALLOWED_ORIGINS in your environment
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Database Connection Issues
- Verify Supabase URL and keys
- Check if project is paused (free tier)
- Ensure schema is properly executed

### Email Not Sending
- Verify SendGrid API key
- Check sender email verification
- Monitor SendGrid dashboard for bounces

### WhatsApp Not Working
- Check access token validity
- Verify phone number ID
- Ensure webhook is properly configured

## 📈 Scaling Considerations

### Free Tier Limits
- **Supabase**: 500MB database, 2GB bandwidth
- **SendGrid**: 100 emails/day
- **WhatsApp**: 1,000 conversations/month
- **Vercel**: 100GB bandwidth, 10GB storage

### Upgrade Paths
- **Supabase Pro**: $25/month for more resources
- **SendGrid Essentials**: $20/month for 50K emails
- **WhatsApp Business**: Pay-as-you-go pricing
- **Vercel Pro**: $20/month for more bandwidth

---

Your TactNova booking backend is now ready for production! 🚀
