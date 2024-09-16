require("dotenv").config();
const { generateMeasurement } = require("./measurementGenerator");

async function sendPatientData(patientId) {
  try {
    const patientData = generateMeasurement(patientId);
    const response = await fetch(process.env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData), // Convert data to JSON string
    });

    // To handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json(); // Parse the JSON response
    console.log(`Data sent for patient ${patientId}:`, responseData.data);
  } catch (error) {
    console.error(`Error sending data for patient ${patientId}:`, error);
  }
}

const patientIds = [73, 2]; // List of patient IDs

setInterval(() => {
  sendPatientData(patientIds[0]);
}, 10000); // Send data every 10 seconds


setInterval(() => {
  sendPatientData(patientIds[1]);
}, 10000); // Send data every 10 seconds
