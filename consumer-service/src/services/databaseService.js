const { connectToDatabase } = require("../config/database");
const { handleError } = require("../utils/errorhandler");
const sql = require("mssql");

async function saveToDatabase(dbConnection, data) {
  try {
    const query = `
  INSERT INTO patient_data (
    patient_id, timestamp, heartbeat, pulse, temperature, blood_pressure_systolic, blood_pressure_diastolic, oxygen_saturation, respiration_rate, body_movement
  )
  VALUES (
    @patientId, @timestamp, @heartbeat, @pulse, @temperature, @bloodPressureSystolic, @bloodPressureDiastolic, @oxygenSaturation, @respirationRate, @bodyMovement
  );
`;

    await dbConnection
      .request()
      .input("patientId", sql.Int, data.id)
      .input("timestamp", sql.DateTime, data.timestamp)
      .input("heartbeat", sql.Int, data.heartbeat)
      .input("pulse", sql.Int, data.pulse)
      .input("temperature", sql.Decimal(5, 1), data.temperature)
      .input("bloodPressureSystolic", sql.Int, data.bloodPressure.systolic)
      .input("bloodPressureDiastolic", sql.Int, data.bloodPressure.diastolic)
      .input("oxygenSaturation", sql.Int, data.oxygenSaturation)
      .input("respirationRate", sql.Int, data.respirationRate)
      .input("bodyMovement", sql.NVarChar(10), data.bodyMovement)
      .query(query);

    console.log("Data saved to database:", data);
  } catch (error) {
    console.error("Error saving data to database:", error);
  }
}

module.exports = { saveToDatabase };
