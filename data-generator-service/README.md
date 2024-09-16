# Patient Monitoring Data Generator

This project is a patient monitoring data generator that simulates and sends patient health metrics to a specified API endpoint at regular intervals. It uses random generation of values to mimic real-time monitoring of patient vitals, including heartbeat, pulse, temperature, blood pressure, oxygen saturation, and respiration rate.

## Features

- Generates simulated health data for patients.
- Sends patient data to an API endpoint using HTTP POST requests.
- Configurable to send data at specified intervals.
- Implements error handling for network requests.

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/patient-monitoring-data-generator.git
   cd patient-monitoring-data-generator


2. **Install dependencies:**
   ```bash
    npm install

    Configuration
API URL: Set the API_URL in the script to the desired endpoint where the patient data should be sent. By default, it's set to:

js
Copy code
const API_URL = "http://localhost:3000/api/send/";
Interval: The script currently sends data for each patient every 10 seconds. You can change the interval by modifying the setInterval function calls in index.js:

js
Copy code
setInterval(() => {
  sendPatientData(patientIds[0]);
}, 10000); // Modify the interval (in milliseconds) here
Usage
Run the script:

bash
Copy code
node index.js
Script Behavior:

The script generates simulated health data for each patient.
It sends the generated data to the specified API endpoint using HTTP POST requests.
Data is sent at regular intervals (every 10 seconds by default).
If an error occurs while sending data, the script logs the error to the console.
Project Structure
src/constants.js: Defines the constants for the range of values for the health metrics (e.g., heartbeat, temperature, blood pressure).
src/measurementGenerator.js: Contains the generateMeasurement function to generate random patient health data.
index.js: The main script that generates and sends patient data at regular intervals.
src/errorHandler.js: Contains the error handling function for handling errors during data transmission.
Example Output
When the script runs successfully, it sends data to the specified API endpoint and logs the result to the console:

plaintext
Copy code
Data sent for patient 1: { ...response data... }
Data sent for patient 2: { ...response data... }
If an error occurs during data transmission, the error will be logged:

plaintext
Copy code
Error sending data for patient 1: Error: HTTP error! Status: 500
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.


patient-data-simulator/
├── src/
│   ├── data/
│   │   └── constants.js               # Contains KPI ranges and constants used in data generation
|        └── measurementGenerator.js    # Generates simulated patient measurements for a patient every 10 seconds
│   ├── utils/
│   │   └── errorhandler.js               # Contains error handling logic
│   └── main.js                    # Entry point for the data generator service
├── .env                           # Environment variables (e.g., RabbitMQ URL, database credentials)
├── package.json                   # Project metadata and dependencies
├── README.md                      # Service documentation
└── LICENSE                        # License information


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/data-generator-service.git