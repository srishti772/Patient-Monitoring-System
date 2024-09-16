const {
  HEARTBEAT_MIN,
  HEARTBEAT_MAX,
  PULSE_VARIANCE,
  TEMP_MIN,
  TEMP_MAX,
  BP_SYSTOLIC_MIN,
  BP_SYSTOLIC_MAX,
  BP_DIASTOLIC_MIN,
  BP_DIASTOLIC_MAX,
  OXYGEN_SAT_MIN,
  OXYGEN_SAT_MAX,
  RESP_RATE_MIN,
  RESP_RATE_MAX,
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

function generateMeasurement(id) {
  const heartbeat =
    Math.floor(Math.random() * (HEARTBEAT_MAX - HEARTBEAT_MIN + 1)) +
    HEARTBEAT_MIN;
  const pulse =
    heartbeat +
    Math.floor(Math.random() * (PULSE_VARIANCE * 2 + 1)) -
    PULSE_VARIANCE;
  const temperature = (
    Math.random() * (TEMP_MAX - TEMP_MIN) +
    TEMP_MIN
  ).toFixed(1);
  const bloodPressure = {
    systolic:
      Math.floor(Math.random() * (BP_SYSTOLIC_MAX - BP_SYSTOLIC_MIN + 1)) +
      BP_SYSTOLIC_MIN,
    diastolic:
      Math.floor(Math.random() * (BP_DIASTOLIC_MAX - BP_DIASTOLIC_MIN + 1)) +
      BP_DIASTOLIC_MIN,
  };
  const oxygenSaturation =
    Math.floor(Math.random() * (OXYGEN_SAT_MAX - OXYGEN_SAT_MIN + 1)) +
    OXYGEN_SAT_MIN;
  const respirationRate =
    Math.floor(Math.random() * (RESP_RATE_MAX - RESP_RATE_MIN + 1)) +
    RESP_RATE_MIN;
  const bodyMovement = Math.random() > 0.5 ? "active" : "rest";
  const timestamp = formatDateToSQLDate(new Date());

  return {
    id,
    heartbeat,
    pulse,
    temperature,
    bloodPressure,
    oxygenSaturation,
    respirationRate,
    bodyMovement,
    timestamp
  };
}

module.exports = { generateMeasurement };
