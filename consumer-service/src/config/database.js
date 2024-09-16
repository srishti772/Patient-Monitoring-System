require("dotenv").config();
const sql = require("mssql");

const DB_CONFIG = {
  user: "sa",
  password: "yourStrong(!)Password",
  server: "localhost", // or the IP address of your SQL Server container
  database: "master",
  options: {
    encrypt: false, // Set to true if using Azure SQL Database
    trustServerCertificate: true, // Set to true if using self-signed certificates
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

  const createTableQuery = `
  IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='patient_data' AND xtype='U')
  CREATE TABLE patient_data (
    patient_id INT,
    timestamp DATETIME NOT NULL,
    heartbeat INT NOT NULL,
    pulse INT NOT NULL,
    temperature DECIMAL(5, 1) NOT NULL,
    blood_pressure_systolic INT NOT NULL,
    blood_pressure_diastolic INT NOT NULL,
    oxygen_saturation INT NOT NULL,
    respiration_rate INT NOT NULL,
    body_movement NVARCHAR(10) NOT NULL,
    PRIMARY KEY (patient_id, timestamp)
  );
`;

  try {
    await pool.request().query(createTableQuery);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

module.exports = { connectToDatabase, initializeDatabase };
