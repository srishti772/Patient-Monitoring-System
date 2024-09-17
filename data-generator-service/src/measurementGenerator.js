const {
  HEARTBEAT_MIN,
  HEARTBEAT_MAX,
  PULSE_MIN,
  PULSE_MAX,
  TEMP_MIN,
  TEMP_MAX,
  BP_SYSTOLIC_MIN,
  BP_SYSTOLIC_MAX,
  BP_DIASTOLIC_MIN,
  BP_DIASTOLIC_MAX,

} = require("./data/constants");

function formatDateToSQLDate(date) {
  // Converts a Date object to SQL DATETIME format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function generateMeasurement(id, deviceType) {
  const timestamp = formatDateToSQLDate(new Date());

  // Generate different measurements based on the device type
  switch (deviceType) {
    case 'heartbeat':
      return {
        id,
        deviceType: 'heartbeat',
        heartbeat: Math.floor(Math.random() * (HEARTBEAT_MAX - HEARTBEAT_MIN + 1)) + HEARTBEAT_MIN,
        pulse: Math.floor(Math.random() * (PULSE_MAX - PULSE_MIN + 1)) + PULSE_MIN,
        timestamp,
      };

    case 'temperature':
      return {
        id,
        deviceType: 'temperature',
        temperature: (Math.random() * (TEMP_MAX - TEMP_MIN) + TEMP_MIN).toFixed(1),
        timestamp,
      };

    case 'bloodPressure':
      return {
        id,
        deviceType: 'bloodPressure',
            systolic: Math.floor(Math.random() * (BP_SYSTOLIC_MAX - BP_SYSTOLIC_MIN + 1)) + BP_SYSTOLIC_MIN,
          diastolic: Math.floor(Math.random() * (BP_DIASTOLIC_MAX - BP_DIASTOLIC_MIN + 1)) + BP_DIASTOLIC_MIN,
      
        timestamp,
      };


    default:
      throw new Error(`Unsupported device type: ${deviceType}`);
  }
}

module.exports = { generateMeasurement };
