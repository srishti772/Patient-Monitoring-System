require('dotenv').config(); 
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

async function initializeDatabase() {
  const connection = await connectToDatabase();

  const createTableQuery = `
   CREATE TABLE IF NOT EXISTS patient_data (
  patient_id INT,
  timestamp DATETIME NOT NULL,
  heartbeat INT NOT NULL,
  pulse INT NOT NULL,
  temperature DECIMAL(5, 1) NOT NULL,
  blood_pressure_systolic INT NOT NULL,
  blood_pressure_diastolic INT NOT NULL,
  oxygen_saturation INT NOT NULL,
  respiration_rate INT NOT NULL,
  body_movement ENUM('active', 'rest') NOT NULL,
  PRIMARY KEY (patient_id, timestamp)
);`;

  try {
    await connection.execute(createTableQuery);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}


module.exports = { connectToDatabase, initializeDatabase };
