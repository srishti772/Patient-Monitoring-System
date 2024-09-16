require('dotenv').config();
const { initializeDatabase } = require('./src/config/database');
const { consumeMessages } = require('./src/services/consumerService');

async function startService() {
  try {
    // Initialize the database
    await initializeDatabase();
    
    // Start the consumer service
    await consumeMessages();
  } catch (error) {
    console.error('Error starting service:', error);
    process.exit(1); // Exit with failure status
  }
}

startService();
