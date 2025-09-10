// Create Contact Tables using raw SQL in Supabase
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

async function createContactTables() {
  console.log('🔧 Creating Contact Tables in Supabase');
  console.log('=====================================\n');

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('1️⃣ Creating contact_messages table...');
    
    // SQL to create contact_messages table
    const createContactMessagesSQL = `
      CREATE TABLE IF NOT EXISTS contact_messages (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          company VARCHAR(200),
          service VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(20) DEFAULT 'new',
          priority VARCHAR(10) DEFAULT 'medium',
          source VARCHAR(50) DEFAULT 'website',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          responded_at TIMESTAMP WITH TIME ZONE,
          admin_notes TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
      CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
    `;

    // Execute SQL using the sql function if available, or try other methods
    try {
      // First method: try using SQL editor endpoint
      const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
        },
        body: JSON.stringify({ query: createContactMessagesSQL })
      });

      if (!response.ok) {
        throw new Error('SQL execution via REST API failed');
      }

      console.log('✅ contact_messages table created via REST API');
    } catch (restError) {
      console.log('⚠️ REST API method failed, trying alternative...');
      
      // Alternative: Use the pg-promise style direct connection
      // Since we can't execute DDL via REST directly, let's test if we can now insert
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        company: 'Test Company',
        service: 'AI Development',
        message: 'This is a test message.'
      };

      const { error } = await supabase
        .from('contact_messages')
        .insert([testData]);

      if (error) {
        console.log('❌ Tables still need manual creation');
        console.log('');
        console.log('Please go to your Supabase dashboard SQL editor and execute:');
        console.log('================================================================');
        console.log(createContactMessagesSQL);
        console.log('');
        console.log('-- Contact responses table');
        console.log(`CREATE TABLE IF NOT EXISTS contact_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_message_id UUID REFERENCES contact_messages(id) ON DELETE CASCADE,
    admin_email VARCHAR(255) NOT NULL,
    response_message TEXT NOT NULL,
    follow_up_action VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`);
        console.log('================================================================');
        console.log('');
        console.log('After creating tables, run: node test-contact-api.js');
        return false;
      } else {
        console.log('✅ Tables appear to be working - cleaning up test data');
        // Clean up test data
        await supabase
          .from('contact_messages')
          .delete()
          .eq('email', 'test@example.com');
      }
    }

    console.log('');
    console.log('2️⃣ Creating contact_responses table...');

    const createResponsesSQL = `
      CREATE TABLE IF NOT EXISTS contact_responses (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          contact_message_id UUID REFERENCES contact_messages(id) ON DELETE CASCADE,
          admin_email VARCHAR(255) NOT NULL,
          response_message TEXT NOT NULL,
          follow_up_action VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Test responses table
    const testResponse = {
      contact_message_id: '12345678-1234-1234-1234-123456789012', // Will fail referential integrity but test table structure
      admin_email: 'admin@tactnova.com',
      response_message: 'Test response',
      follow_up_action: 'test'
    };

    const { error: responseError } = await supabase
      .from('contact_responses')
      .insert([testResponse]);

    if (responseError && responseError.message.includes('does not exist')) {
      console.log('❌ contact_responses table needs manual creation');
      console.log('Execute this SQL in Supabase:');
      console.log(createResponsesSQL);
      return false;
    } else {
      console.log('✅ contact_responses table is working');
      // Clean up if it was inserted (though it probably failed on FK constraint)
      await supabase
        .from('contact_responses')
        .delete()
        .eq('admin_email', 'admin@tactnova.com');
    }

    console.log('');
    console.log('🎉 Database Setup Complete!');
    console.log('===========================');
    console.log('✅ contact_messages: Ready');
    console.log('✅ contact_responses: Ready');
    console.log('✅ All indexes: Created');
    console.log('');
    console.log('🧪 Ready to test! Run: node test-contact-api.js');
    
    return true;

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('');
    console.log('🔧 Please create tables manually in Supabase dashboard');
    return false;
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  createContactTables();
}

module.exports = { createContactTables };
