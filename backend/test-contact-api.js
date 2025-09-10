// Test script for TactNova Contact API
// This script tests the complete contact form workflow

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test data
const testContact = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1-555-0123',
  company: 'Tech Innovations LLC',
  service: 'AI Development',
  message: 'I need help building an AI-powered customer service chatbot for my e-commerce platform. The bot should handle order inquiries, returns, and basic support questions.'
};

async function testContactAPI() {
  console.log('🧪 Testing TactNova Contact API');
  console.log('================================\n');

  try {
    // 1. Test Health Check
    console.log('1️⃣ Testing Health Check...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', health.data.message);
    console.log('📊 Status:', health.data.status);
    console.log('⏰ Timestamp:', health.data.timestamp);
    console.log('');

    // 2. Test Contact Form Submission
    console.log('2️⃣ Testing Contact Form Submission...');
    console.log('📝 Submitting contact form with data:');
    console.log(JSON.stringify(testContact, null, 2));
    
    const contactResponse = await axios.post(`${API_BASE}/contact`, testContact);
    console.log('✅ Contact Submitted Successfully!');
    console.log('📧 Contact ID:', contactResponse.data.contact.id);
    console.log('📅 Created At:', contactResponse.data.contact.created_at);
    console.log('📊 Status:', contactResponse.data.contact.status);
    console.log('');

    const contactId = contactResponse.data.contact.id;

    // 3. Test Get All Contacts
    console.log('3️⃣ Testing Get All Contacts...');
    const allContacts = await axios.get(`${API_BASE}/contacts`);
    console.log('✅ Retrieved All Contacts');
    console.log('📊 Total Contacts:', allContacts.data.contacts.length);
    console.log('📄 Pagination:', allContacts.data.pagination);
    console.log('');

    // 4. Test Get Single Contact
    console.log('4️⃣ Testing Get Single Contact...');
    const singleContact = await axios.get(`${API_BASE}/contacts/${contactId}`);
    console.log('✅ Retrieved Single Contact');
    console.log('👤 Name:', singleContact.data.contact.name);
    console.log('📧 Email:', singleContact.data.contact.email);
    console.log('🏢 Company:', singleContact.data.contact.company);
    console.log('');

    // 5. Test Update Contact Status
    console.log('5️⃣ Testing Update Contact Status...');
    const statusUpdate = await axios.patch(`${API_BASE}/contacts/${contactId}/status`, {
      status: 'in_progress',
      notes: 'Reviewing requirements and preparing proposal'
    });
    console.log('✅ Status Updated Successfully');
    console.log('📊 New Status:', statusUpdate.data.contact.status);
    console.log('📝 Notes:', statusUpdate.data.contact.admin_notes);
    console.log('');

    // 6. Test Admin Response (Meeting Request)
    console.log('6️⃣ Testing Admin Response...');
    const adminResponse = await axios.post(`${API_BASE}/contacts/${contactId}/respond`, {
      adminEmail: 'admin@tactnova.com',
      responseMessage: 'Thank you for your inquiry about AI development! We would love to discuss your chatbot project in detail. Based on your requirements, we can definitely help you build a sophisticated AI-powered customer service solution.',
      followUpAction: 'schedule_call'
    });
    console.log('✅ Admin Response Sent Successfully');
    console.log('📧 Response ID:', adminResponse.data.response.id);
    console.log('👤 Admin Email:', adminResponse.data.response.admin_email);
    console.log('🎯 Follow-up Action:', adminResponse.data.response.follow_up_action);
    console.log('');

    // 7. Test API Documentation
    console.log('7️⃣ Testing API Documentation...');
    const docs = await axios.get(`${API_BASE}/docs`);
    console.log('✅ API Documentation Retrieved');
    console.log('📖 API Name:', docs.data.name);
    console.log('🔢 Version:', docs.data.version);
    console.log('📋 Available Endpoints:', Object.keys(docs.data.endpoints).length);
    console.log('');

    console.log('🎉 All Contact API Tests Passed Successfully!');
    console.log('=====================================\n');

    console.log('🔍 Test Summary:');
    console.log('✅ Health Check: Working');
    console.log('✅ Contact Submission: Working');
    console.log('✅ Get All Contacts: Working'); 
    console.log('✅ Get Single Contact: Working');
    console.log('✅ Update Status: Working');
    console.log('✅ Admin Response: Working');
    console.log('✅ API Documentation: Working');
    console.log('');

    console.log('🚀 The contact form backend is ready for frontend integration!');

  } catch (error) {
    console.error('❌ Test Failed:');
    
    if (error.response) {
      // Server responded with error status
      console.error('📊 Status:', error.response.status);
      console.error('📝 Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('🌐 Network Error: No response from server');
      console.error('🔍 Check if server is running on port 5000');
    } else {
      // Something else happened
      console.error('⚠️ Error:', error.message);
    }
    
    process.exit(1);
  }
}

// Run the tests
testContactAPI();
