require("dotenv").config();
const { generateMeasurement } = require("./measurementGenerator");

async function sendPatientData(patientId, deviceType) {
  try {
    // Generate the measurement data with the specified device type
    const patientData = generateMeasurement(patientId, deviceType);
    const response = await fetch(process.env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData), // Convert data to JSON string
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json(); // Parse the JSON response
    console.log(`Data sent for patient ${patientId} (${deviceType}):`, responseData.data);
  } catch (error) {
    console.error(`Error sending data for patient ${patientId} (${deviceType}):`, error);
  }
}

const patientIds = [99]; // List of patient IDs
const deviceTypes = ["heartbeat", "temperature", "bloodPressure"]; // Add more device types as needed

// Schedule data sending for each patient and each device type
patientIds.forEach(patientId => {
  deviceTypes.forEach(deviceType => {
    setInterval(() => {
      sendPatientData(patientId, deviceType);
    }, 5000); // Send data every 10 seconds
  });
});
