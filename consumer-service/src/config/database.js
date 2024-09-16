/**require('dotenv').config(); 
 const mysql = require('mysql2/promise');

const DB_CONFIG = {
   host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'patient_data',
};

async function connectToDatabase() {
  try {
    return await mysql.createConnection(DB_CONFIG);
  } catch (error) {
    throw new Error(`Failed to connect to the database: ${error.message}`);
  }
}

module.exports = { connectToDatabase };
**/