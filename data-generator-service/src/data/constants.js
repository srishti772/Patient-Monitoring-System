// Heartbeat (bpm)
const HEARTBEAT_MIN = 60;
const HEARTBEAT_MAX = 100;

// Pulse variance
const PULSE_VARIANCE = 5;

// Temperature (°C)
const TEMP_MIN = 36.5;
const TEMP_MAX = 37.5;

// Blood Pressure (mmHg)
const BP_SYSTOLIC_MIN = 110;
const BP_SYSTOLIC_MAX = 130;
const BP_DIASTOLIC_MIN = 70;
const BP_DIASTOLIC_MAX = 90;

// Oxygen Saturation (%)
const OXYGEN_SAT_MIN = 95;
const OXYGEN_SAT_MAX = 100;

// Respiration Rate (breaths per minute)
const RESP_RATE_MIN = 12;
const RESP_RATE_MAX = 20;

module.exports = {
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
    RESP_RATE_MAX
};
