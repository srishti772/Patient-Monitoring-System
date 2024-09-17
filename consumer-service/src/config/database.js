require("dotenv").config();
const sql = require("mssql");

const DB_CONFIG = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, 
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Convert string to boolean
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true', // Convert string to boolean
  },
};

async function connectToDatabase() {
  try {
    return await sql.connect(DB_CONFIG);
  } catch (error) {
    throw new Error(`Failed to connect to the database: ${error.message}`);
  }
}

async function initializeDatabase() {
  const pool = await connectToDatabase();

  const createHeartbeatTableQuery = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='heartbeat_data' AND xtype='U')
    CREATE TABLE heartbeat_data (
      patient_id INT,
      timestamp DATETIME NOT NULL,
      heartbeat INT NOT NULL,
      pulse INT NOT NULL,
      PRIMARY KEY (patient_id, timestamp)
    );
  `;

  const createBloodPressureTableQuery = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='blood_pressure_data' AND xtype='U')
    CREATE TABLE blood_pressure_data (
      patient_id INT,
      timestamp DATETIME NOT NULL,
      systolic INT NOT NULL,
      diastolic INT NOT NULL,
      PRIMARY KEY (patient_id, timestamp)
    );
  `;

  const createTemperatureTableQuery = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='temperature_data' AND xtype='U')
    CREATE TABLE temperature_data (
      patient_id INT,
      timestamp DATETIME NOT NULL,
      temperature DECIMAL(5, 1) NOT NULL,
      PRIMARY KEY (patient_id, timestamp)
    );
  `;

  try {
    // Execute table creation queries
    await pool.request().query(createHeartbeatTableQuery);
    await pool.request().query(createBloodPressureTableQuery);
    await pool.request().query(createTemperatureTableQuery);
    console.log("Database initialized successfully with separate tables");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

module.exports = { connectToDatabase, initializeDatabase };
