#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 TactNova Backend Setup Script\n');

// Check if Node.js version is 18+
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js 18+ is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
  } else {
    console.log('⚠️  .env.example not found, creating basic .env file');
    const basicEnv = `# TactNova Backend Configuration
# Copy this file to .env and fill in your actual values

# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_EMAIL=admin@yourdomain.com
FROM_EMAIL=noreply@yourdomain.com

# WhatsApp Cloud API Configuration
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_VERIFY_TOKEN=your_whatsapp_verify_token

# Admin Contact Information
ADMIN_PHONE=+1234567890
ADMIN_WHATSAPP=+1234567890

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
`;
    fs.writeFileSync(envPath, basicEnv);
    console.log('✅ Created basic .env file');
  }
} else {
  console.log('✅ .env file already exists');
}

// Check if package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found. Please run this script from the backend directory.');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Check if database schema exists
const schemaPath = path.join(__dirname, 'database', 'schema.sql');
if (fs.existsSync(schemaPath)) {
  console.log('✅ Database schema found');
} else {
  console.log('⚠️  Database schema not found at database/schema.sql');
}

console.log('\n🎉 Setup completed successfully!\n');

console.log('📋 Next steps:');
console.log('1. Edit .env file with your actual credentials:');
console.log('   - Supabase: https://supabase.com');
console.log('   - SendGrid: https://sendgrid.com');
console.log('   - WhatsApp: https://developers.facebook.com');
console.log('');
console.log('2. Setup your database:');
console.log('   - Go to Supabase SQL Editor');
console.log('   - Execute the SQL from database/schema.sql');
console.log('');
console.log('3. Start the development server:');
console.log('   npm run dev');
console.log('');
console.log('4. Test the API:');
console.log('   curl http://localhost:5000/api/health');
console.log('');
console.log('📖 For detailed instructions, see:');
console.log('   - README.md (Complete documentation)');
console.log('   - SETUP.md (Quick setup guide)');
console.log('   - DEPLOYMENT.md (Production deployment)');
console.log('');
console.log('🆘 Need help? Check the troubleshooting section in README.md');
