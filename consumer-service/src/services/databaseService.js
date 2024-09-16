const { connectToDatabase } = require("../config/database");
const { handleError } = require("../utils/errorhandler");

async function saveToDatabase(dbConnection, data) {
  try {
    await dbConnection.execute(
      `INSERT INTO patient_data (patient_id, timestamp, heartbeat, pulse, temperature, blood_pressure_systolic, blood_pressure_diastolic, oxygen_saturation, respiration_rate, body_movement)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        data.id,
        data.timestamp,
        data.heartbeat,
        data.pulse,
        data.temperature,
        data.bloodPressure.systolic,
        data.bloodPressure.diastolic,
        data.oxygenSaturation,
        data.respirationRate,
        data.bodyMovement,
      ]
    );
    console.log("Data saved to database:", data);
  } catch (error) {
    console.error("Error in saving to database:", error);
  }
}

module.exports = { saveToDatabase };
