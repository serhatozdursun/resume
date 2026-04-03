#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredEnvVars = [
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'EMAILJS_PUBLIC_KEY',
  'NEXT_PUBLIC_GA_TRACKING_ID',
];

function validateEnvironment() {
  console.log('🔍 Validating environment variables...\n');

  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);

  if (!envExists) {
    console.log('❌ .env.local file not found!');
    console.log(
      '📝 Please create .env.local file with the following variables:'
    );
    requiredEnvVars.forEach(varName => {
      console.log(`   ${varName}=your_value_here`);
    });
    console.log('\n💡 You can copy env.example to get started:');
    console.log('   cp env.example .env.local');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const missingVars = [];

  requiredEnvVars.forEach(varName => {
    if (!envContent.includes(varName)) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.log('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('\n📝 Please add these variables to your .env.local file');
    process.exit(1);
  }

  console.log('✅ All required environment variables are present!');
  console.log('🚀 You can now run the development server with: yarn dev');
}

if (require.main === module) {
  validateEnvironment();
}

module.exports = validateEnvironment;
