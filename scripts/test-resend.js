// A simple script to test the Resend API directly and see the exact error
// Run with: node scripts/test-resend.js <YOUR_RESEND_API_KEY>
import fs from 'fs';

let apiKey = process.argv[2];

if (!apiKey) {
  // try to read from .env or .dev.vars if available
  try {
    const devVars = fs.readFileSync('.dev.vars', 'utf-8');
    const match = devVars.match(/RESEND_API_KEY=([^\n]+)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {}
  
  if (!apiKey) {
    try {
      const env = fs.readFileSync('.env', 'utf-8');
      const match = env.match(/RESEND_API_KEY=([^\n]+)/);
      if (match) apiKey = match[1].trim();
    } catch (e) {}
  }

  if (!apiKey) {
    console.error('Please provide your Resend API key as an argument:');
    console.error('node scripts/test-resend.js re_123456789');
    process.exit(1);
  }
}

async function run() {
  console.log('Sending test email via Resend API to info@pestexperts.co.za...');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'info@pestexperts.co.za', // As configured in submit-lead.ts
      to: ['info@pestexperts.co.za'],
      subject: 'Test Email for Debugging',
      html: '<p>This is a test email to debug the Resend API.</p>',
    }),
  });

  const status = response.status;
  const body = await response.text();

  console.log(`HTTP Status: ${status}`);
  if (status === 200) {
    console.log('Success! Your Resend configuration is valid and working.');
  } else {
    console.error('Error Response from Resend:');
    try {
      console.error(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      console.error(body);
    }
  }
}

run();
