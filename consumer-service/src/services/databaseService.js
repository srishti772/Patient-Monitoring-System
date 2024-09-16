/**const { connectToDatabase } = require('../config/database');
const { handleError } = require('./utils/errorHandler');

async function saveToDatabase(connection, data) {
  try {
    const query = 'INSERT INTO patient_data (id, heartbeat, pulse, temperature, blood_pressure, oxygen_saturation, respiration_rate, body_movement, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await connection.execute(query, [
      data.id,
      data.heartbeat,
      data.pulse,
      data.temperature,
      `${data.bloodPressure.systolic}/${data.bloodPressure.diastolic}`,
      data.oxygenSaturation,
      data.respirationRate,
      data.bodyMovement,
      data.timestamp
    ]);
    console.log(`Data saved to database: ${JSON.stringify(data)}`);
  } catch (error) {
    handleError('saving to database', error);
  }
}

module.exports = { saveToDatabase };
**/