const sql = require("mssql");
require('dotenv').config(); // Load environment variables

// Access Power BI URLs from environment variables
const POWER_BI_URLS = {
  heartbeat: process.env.POWER_BI_URLS_heartbeat,
  bloodPressure: process.env.POWER_BI_URLS_bloodPressure,
  temperature: process.env.POWER_BI_URLS_temperature,
};

async function saveToDatabase(dbConnection, data) {
  try {
    let query;
    let powerBiUrl;

    // Transform data to match Power BI streaming dataset schema
    const powerBiData = [];

    switch (data.deviceType) {
      case "heartbeat":
        query = `
          INSERT INTO heartbeat_data (patient_id, timestamp, heartbeat, pulse)
          VALUES (@patientId, @timestamp, @heartbeat, @pulse);
        `;
        powerBiUrl = POWER_BI_URLS.heartbeat;

        // Add the transformed data to the array for Power BI
        powerBiData.push({
          patient_id: data.id,
          heartbeat: data.heartbeat,
          pulse: data.pulse,
          timestamp: new Date(data.timestamp).toISOString(), // Ensure the timestamp is in the correct format
        });

        await dbConnection
          .request()
          .input("patientId", sql.Int, data.id)
          .input("timestamp", sql.DateTime, data.timestamp)
          .input("heartbeat", sql.Int, data.heartbeat)
          .input("pulse", sql.Int, data.pulse)
          .query(query);
        break;

      case "bloodPressure":
        query = `
          INSERT INTO blood_pressure_data (patient_id, timestamp, systolic, diastolic)
          VALUES (@patientId, @timestamp, @systolic, @diastolic);
        `;
        powerBiUrl = POWER_BI_URLS.bloodPressure;

        // Add the transformed data to the array for Power BI
        powerBiData.push({
          patient_id: data.id,
          systolic: data.systolic,
          diastolic: data.diastolic,
          timestamp: new Date(data.timestamp).toISOString(),
        });

        await dbConnection
          .request()
          .input("patientId", sql.Int, data.id)
          .input("timestamp", sql.DateTime, data.timestamp)
          .input("systolic", sql.Int, data.systolic)
          .input("diastolic", sql.Int, data.diastolic)
          .query(query);
        break;

      case "temperature":
        query = `
          INSERT INTO temperature_data (patient_id, timestamp, temperature)
          VALUES (@patientId, @timestamp, @temperature);
        `;
        powerBiUrl = POWER_BI_URLS.temperature;

        // Add the transformed data to the array for Power BI
        powerBiData.push({
          patient_id: data.id,
          temperature: data.temperature,
          timestamp: new Date(data.timestamp).toISOString(),
        });

        await dbConnection
          .request()
          .input("patientId", sql.Int, data.id)
          .input("timestamp", sql.DateTime, data.timestamp)
          .input("temperature", sql.Decimal(5, 1), data.temperature)
          .query(query);
        break;

      default:
        throw new Error(`Unknown device type: ${data.deviceType}`);
    }

    // Send transformed data to Power BI
    if (powerBiUrl) {
      await fetch(powerBiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(powerBiData), // Send the array to Power BI
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log(`Data sent to Power BI: ${data.deviceType}`);
        })
        .catch((error) => {
          console.error(`Error sending data to Power BI: ${error}`);
        });
    }

    console.log(`Data saved to ${data.deviceType} table:`, data);
  } catch (error) {
    console.error("Error saving data to database:", error);
  }
}

module.exports = { saveToDatabase };
