#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

console.log('🧪 Testing TactNova Backend API\n');
console.log(`API Base URL: ${BASE_URL}\n`);

async function testAPI() {
  const tests = [
    {
      name: 'Health Check',
      method: 'GET',
      url: `${BASE_URL}/health`,
      expectStatus: 200
    },
    {
      name: 'Create Booking',
      method: 'POST',
      url: `${BASE_URL}/bookings`,
      data: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        company: 'Test Company',
        service: 'AI Development',
        selectedDate: '2025-09-15',
        selectedTime: '14:30'
      },
      expectStatus: 201
    },
    {
      name: 'Get Bookings',
      method: 'GET',
      url: `${BASE_URL}/bookings`,
      expectStatus: 200
    },
    {
      name: 'Get API Documentation',
      method: 'GET',
      url: `${BASE_URL}/docs`,
      expectStatus: 200
    }
  ];

  let passedTests = 0;
  let failedTests = 0;

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}...`);
      
      const config = {
        method: test.method,
        url: test.url,
        timeout: 5000
      };

      if (test.data) {
        config.data = test.data;
        config.headers = { 'Content-Type': 'application/json' };
      }

      const response = await axios(config);
      
      if (response.status === test.expectStatus) {
        console.log(`✅ ${test.name} - PASSED (${response.status})`);
        passedTests++;
      } else {
        console.log(`❌ ${test.name} - FAILED (Expected: ${test.expectStatus}, Got: ${response.status})`);
        failedTests++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} - FAILED (${error.message})`);
      failedTests++;
    }
    
    console.log('');
  }

  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`📈 Success Rate: ${Math.round((passedTests / (passedTests + failedTests)) * 100)}%`);

  if (failedTests > 0) {
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the server is running: npm run dev');
    console.log('2. Check your .env configuration');
    console.log('3. Verify database connection');
    console.log('4. Check server logs for errors');
  } else {
    console.log('\n🎉 All tests passed! Your backend is working correctly.');
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node test-api.js [--url=<api-url>]');
  console.log('');
  console.log('Options:');
  console.log('  --url=<url>    Test a specific API URL (default: http://localhost:5000/api)');
  console.log('  --help, -h     Show this help message');
  process.exit(0);
}

// Parse URL argument
const urlArg = args.find(arg => arg.startsWith('--url='));
if (urlArg) {
  const customUrl = urlArg.split('=')[1];
  process.env.API_URL = customUrl;
}

testAPI().catch(console.error);
