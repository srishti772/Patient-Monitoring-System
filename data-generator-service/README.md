# Data Generator

This project is a patient monitoring data generator that simulates and sends patient health metrics to a specified API endpoint at regular intervals. It uses random generation of values to mimic real-time monitoring of patient vitals, including heartbeat, pulse, temperature, blood pressure, oxygen saturation, and respiration rate.

## Features

- Generates simulated health data for patients.
- Sends patient data to an API endpoint using HTTP POST requests.
- Configurable to send data at specified intervals.
- Implements error handling for network requests.

## Folder Structure

patient-data-simulator/
├── src/
│ ├── data/
│ │ └── constants.js # Contains KPI ranges and constants used in data generation
| └── measurementGenerator.js # Generates simulated patient measurements for a patient every 10 seconds
│ ├── utils/
│ │ └── errorhandler.js # Contains error handling logic
│ └── main.js # Entry point for the data generator service
├── .env # Environment variables (e.g., RabbitMQ URL, database credentials)
├── package.json # Project metadata and dependencies
├── README.md # Service documentation
└── LICENSE # License information

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- RabbitMQ

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/patient-monitoring-data-generator.git
   cd patient-monitoring-data-generator

   ```

2. **Install dependencies:**

   ```bash
    npm install

   ```

3. **Configuration:**
   ## API URL:
   Set the API_URL in the script to the desired endpoint where the patient data should be sent. By default, it's set to:
   const API_URL = "http://localhost:3001/api/send/";
   ## Interval:
   The script currently sends data for each patient every 10 seconds. You can change the interval by modifying the setInterval function calls in index.js:
   ```bash
   setInterval(() => {
   sendPatientData(patientIds[0]);
   }, 10000); // Modify the interval (in milliseconds) here
   ```

### Usage

Run the following command:

```bash
npm start
```

## Example Output

When the script runs successfully, it sends data to the specified API endpoint and logs the result to the console:

```css
data sent for patient 1: {
  ...response data...;
}
data sent for patient 2: {
  ...response data...;
}
```

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

### Contact

For questions or support, please contact [Srishti Ahirwar](mailto:ahirwar.s@northeastern.edu).
