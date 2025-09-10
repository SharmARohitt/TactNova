# TactNova Backend - Setup Instructions

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:
```env
# Get these from your service providers
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SENDGRID_API_KEY=your_sendgrid_api_key
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
```

### 3. Database Setup
- Go to your Supabase project → SQL Editor
- Execute the SQL from `database/schema.sql`

### 4. Start Development Server
```bash
npm run dev
```

Server runs on: http://localhost:5000

## 🔧 Service Provider Setup

### Supabase (Database)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy Project URL and API keys from Settings → API

### SendGrid (Email)
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Generate API key: Settings → API Keys
3. Verify sender email: Settings → Sender Authentication

### WhatsApp Cloud API (Optional)
1. Create Meta Developer account
2. Create new app → Add WhatsApp product
3. Get access token and phone number ID

## 📋 Testing

Test the API endpoints:

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Test Corp",
    "service": "AI Development",
    "selectedDate": "2025-09-15",
    "selectedTime": "14:30"
  }'
```

## 🚀 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

Quick deploy options:
- **Vercel**: `vercel --prod`
- **Railway**: `railway up`
- **Heroku**: `git push heroku main`

## 📖 Documentation

- Full API docs: http://localhost:5000/api/docs
- Database schema: `database/schema.sql`
- Deployment guide: `DEPLOYMENT.md`

## 🆘 Need Help?

Common issues:
1. **Database errors**: Check Supabase credentials
2. **Email not sending**: Verify SendGrid API key
3. **CORS errors**: Update ALLOWED_ORIGINS in .env

For more help, check the troubleshooting section in `README.md`.
