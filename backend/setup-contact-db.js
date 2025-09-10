// Database Setup Script for TactNova Contact System
// This script helps set up the contact tables in Supabase

require('dotenv').config();
const supabaseService = require('./src/services/supabaseService');

async function setupContactDatabase() {
  console.log('📊 Setting up TactNova Contact Database');
  console.log('=====================================\n');

  try {
    // Test Supabase connection
    console.log('1️⃣ Testing Supabase Connection...');
    
    // Try to query the bookings table to verify connection
    const { data: testData, error: testError } = await supabaseService.supabase
      .from('bookings')
      .select('id')
      .limit(1);
      
    if (testError && !testError.message.includes('does not exist')) {
      throw new Error(`Supabase connection failed: ${testError.message}`);
    }
    
    console.log('✅ Supabase connection successful');
    console.log('');

    // Check if contact_messages table exists
    console.log('2️⃣ Checking if contact_messages table exists...');
    
    const { data: existingData, error: existingError } = await supabaseService.supabase
      .from('contact_messages')
      .select('id')
      .limit(1);
      
    if (existingError) {
      if (existingError.message.includes('does not exist')) {
        console.log('⚠️ Contact tables do not exist yet');
        console.log('');
        console.log('🔧 Please execute the following SQL in your Supabase dashboard:');
        console.log('================================================');
        console.log('');
        
        // Read and display the schema
        const fs = require('fs');
        const schemaPath = './src/database/contact_schema.sql';
        
        if (fs.existsSync(schemaPath)) {
          const schema = fs.readFileSync(schemaPath, 'utf8');
          console.log(schema);
        } else {
          console.log('-- Contact Messages Table');
          console.log('CREATE TABLE contact_messages (');
          console.log('  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),');
          console.log('  name VARCHAR(255) NOT NULL,');
          console.log('  email VARCHAR(255) NOT NULL,');
          console.log('  phone VARCHAR(50),');
          console.log('  company VARCHAR(255),');
          console.log('  service VARCHAR(255) NOT NULL,');
          console.log('  message TEXT NOT NULL,');
          console.log('  status VARCHAR(50) DEFAULT \'new\',');
          console.log('  priority VARCHAR(50) DEFAULT \'medium\',');
          console.log('  admin_notes TEXT,');
          console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,');
          console.log('  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP');
          console.log(');');
          console.log('');
          console.log('-- Contact Responses Table');
          console.log('CREATE TABLE contact_responses (');
          console.log('  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),');
          console.log('  contact_message_id UUID REFERENCES contact_messages(id) ON DELETE CASCADE,');
          console.log('  admin_email VARCHAR(255) NOT NULL,');
          console.log('  response_message TEXT NOT NULL,');
          console.log('  follow_up_action VARCHAR(100),');
          console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP');
          console.log(');');
        }
        
        console.log('');
        console.log('================================================');
        console.log('After executing the SQL, run this script again to verify setup.');
        console.log('');
        return;
      } else {
        throw new Error(`Database query failed: ${existingError.message}`);
      }
    }
    
    console.log('✅ Contact tables exist and are accessible');
    console.log('');

    // Test insert a sample contact to verify everything works
    console.log('3️⃣ Testing contact insertion...');
    
    const testContact = {
      name: 'Database Test User',
      email: 'dbtest@example.com',
      phone: '+1-555-TEST',
      company: 'Database Test Co',
      service: 'Database Testing',
      message: 'This is a test message to verify the database setup is working correctly.',
      status: 'new',
      priority: 'low'
    };

    const insertResult = await supabaseService.createContactMessage(testContact);
    console.log('✅ Test contact inserted successfully');
    console.log('📧 Contact ID:', insertResult.id);
    console.log('');

    // Clean up test data
    console.log('4️⃣ Cleaning up test data...');
    await supabaseService.deleteContactMessage(insertResult.id);
    console.log('✅ Test data cleaned up');
    console.log('');

    console.log('🎉 Database Setup Complete!');
    console.log('==========================');
    console.log('✅ Supabase Connection: Working');
    console.log('✅ Contact Tables: Created & Accessible');
    console.log('✅ CRUD Operations: Functional');
    console.log('');
    console.log('🚀 The contact database is ready for use!');

  } catch (error) {
    console.error('❌ Database Setup Failed:');
    console.error('Error:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting Steps:');
    console.log('1. Check your Supabase credentials in .env file');
    console.log('2. Verify your Supabase project is active');
    console.log('3. Make sure you have the correct permissions');
    console.log('4. Execute the contact_schema.sql in Supabase dashboard');
    
    process.exit(1);
  }
}

// Run the setup
setupContactDatabase();
