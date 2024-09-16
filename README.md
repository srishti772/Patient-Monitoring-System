# Patient Data Simulator

This project simulates patient data for testing and analysis purposes. The data is sent to RabbitMQ queues, which are then consumed and stored in a SQL database. The simulated data includes various Key Performance Indicators (KPIs) that represent common health metrics.

## Key Performance Indicators (KPIs) and Their Ranges

### 1. Heartbeat (Heart Rate)

- **Range**: 60 to 100 beats per minute (bpm)
- **Reason**: A normal resting heart rate for adults ranges from 60 to 100 bpm. Values below 60 might indicate bradycardia (slow heart rate), and values above 100 might indicate tachycardia (fast heart rate).

### 2. Pulse

- **Range**: Heart rate ± 5 bpm
- **Reason**: Pulse rate is generally close to the heart rate with a small variance. This simulates normal differences between pulse and heart rate.

### 3. Temperature

- **Range**: 36.5°C to 37.5°C
- **Reason**: Normal body temperature typically ranges from 36.1°C to 37.2°C. The range here includes some variation to reflect normal fluctuations throughout the day.

### 4. Blood Pressure

- **Systolic**: 110 to 130 mmHg
- **Diastolic**: 70 to 90 mmHg
- **Reason**: Normal blood pressure for adults is around 120/80 mmHg. Systolic pressure is considered normal up to around 130 mmHg, and diastolic pressure up to around 90 mmHg.

### 5. Oxygen Saturation

- **Range**: 95% to 100%
- **Reason**: Normal oxygen saturation levels for healthy individuals are typically between 95% and 100%. Levels below 95% might indicate issues with oxygenation.

### 6. Respiration Rate

- **Range**: 12 to 20 breaths per minute
- **Reason**: The normal resting respiration rate for adults ranges from 12 to 20 breaths per minute. Rates outside this range can indicate respiratory issues or conditions.

### 7. Body Movement

- **Values**: 'active' or 'rest'
- **Reason**: This KPI simulates whether the patient is currently active or at rest. It provides context to other measurements, such as higher pulse rates during activity.

## Project Structure

The project is organized into the following directory structure:
patient-data-simulator/
├── src/
├── constants.js # Contains KPI ranges and constants used in data generation
├── measurementGenerator.js # Generates simulated patient measurements
├── amqpConnection.js # Manages RabbitMQ connections and channels
├── publisher.js # Publishes messages to RabbitMQ exchanges
├── consumer.js # Consumes messages from RabbitMQ queues and stores them in SQL
└── main.js # Entry point for running the publisher and consumer
├── .env # Environment variables (e.g., RabbitMQ URL)
├── package.json # Project metadata and dependencies
├── README.md # Project documentation

### `src/constants.js`

Contains the ranges for various KPIs used in the data simulation. This file centralizes configuration values and constants.

### `src/measurementGenerator.js`

Defines the `generateMeasurement` function that creates simulated patient data based on predefined KPI ranges. This data includes metrics like heartbeat, pulse, temperature, blood pressure, oxygen saturation, respiration rate, and body movement.

### `src/amqpConnection.js`

Handles RabbitMQ connection setup and channel creation. Includes functions to connect to RabbitMQ and create channels with specific queues.

### `src/publisher.js`

Implements the logic to publish messages to RabbitMQ exchanges. It uses `createChannel` from `amqpConnection.js` to establish channels and send simulated patient data. Messages are published at regular intervals.

### `src/consumer.js`

Listens for messages from RabbitMQ queues and processes them. This script is responsible for consuming patient data from queues and storing it into a SQL database. It also handles error management.

### `src/main.js`

The entry point of the application. It sets up and starts both the publisher and consumer processes. It generates random patient IDs to publish data to different queues and ensures that the consumer processes data from all queues.

### `.env`

Contains environment variables such as the RabbitMQ URL. Ensure to create this file in the root directory and add your RabbitMQ connection string.

### `package.json`

Lists project dependencies and includes scripts for development. Contains information about the project, including the main entry point and scripts for running the application.

### `README.md`

Provides documentation about the project, including setup instructions, project structure, and details about the KPIs used in the simulation.

### `LICENSE`

Includes license information for the project.

## Getting Started

To run the project locally, follow these steps:

1. **Install Dependencies**:

   ```bash
   npm install

   ```

2. **Create a .env File: Create a .env file in the root directory and add your RabbitMQ URL:**:

   ```bash
    RABBITMQ_URL=amqp://localhost

   ```

3. **Start the Application: Use nodemon to run the application:**:
   ```bash
    npm start
   ```

### `Contributing`

Feel free to open issues or submit pull requests if you have suggestions or improvements.

### `LICENSE`

This project is licensed under the ISC License - see the LICENSE file for details.

### Summary

- **Project Structure**: Provides a detailed breakdown of the directory and file structure, explaining the purpose of each component.
- **Getting Started**: Instructions on how to set up and run the project.
- **Contributing and License**: Information on how to contribute and licensing details.

This README.md gives a comprehensive overview of the project and guides users through understanding and running it.
