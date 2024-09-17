# Patient Monitoring System

This project is a comprehensive system designed to monitor and manage patient health data through multiple services. The system comprises three main components:

1. **Patient Data Generator**: Simulates and sends patient health metrics to an API endpoint at regular intervals.
2. **Producer Service**: Receives patient data through an API endpoint, publishes the data to RabbitMQ, and handles errors.
3. **Consumer Service**: Consumes messages from RabbitMQ queues, stores data in an SQL Server database, and sends data to Power BI for streaming.

## Folder Structure

consumer-service/: Contains the Consumer Service.
data-generator-service/: Contains the Patient Data Generator.
producer-service/: Contains the Producer Service.

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

## Communication Flow

### Data Generation:

The Patient Data Generator periodically creates simulated patient health data and sends it to the Producer Service via an API.

### Data Publishing:

The Producer Service receives the data and publishes it to RabbitMQ.

### Data Consumption:

The Consumer Service subscribes to RabbitMQ queues, processes the incoming messages, and stores the data in SQL Server.

### Data Visualization:

The Consumer Service also sends processed data to Power BI for visualization and real-time monitoring.

## Services

### 1. Patient Data Generator

**Role**: Simulates and sends patient health metrics to an API endpoint at regular intervals.

**Interactions:**
Generates simulated patient data.
Sends data to the Producer Service via HTTP POST requests.

**Technology Stack:**
Node.js

**Usage:**

1. Start the generator with:
   ```bash
   npm start
   ```
2. Configure the API endpoint and intervals in the script.

### 2. Producer Service

**Role**: Receives patient data from the Data Generator, publishes it to RabbitMQ, and handles errors.

**Interactions:**
Receives data from the Patient Data Generator.
Publishes data to RabbitMQ using direct exchanges and routing keys.

**Technology Stack:**
Node.js
RabbitMQ

**Usage:**

1. Start the service with:
   ```bash
   npm start
   ```
2. Configure RabbitMQ details in the .env file.

### 3. Consumer Service

**Role:** Consumes patient data messages from RabbitMQ, stores them in an SQL Server database, and sends the data to Power BI for visualization.

**Interactions:**

- Receives data from RabbitMQ queues.
- Stores data in SQL Server.
- Sends data to Power BI for real-time analytics.

**Technology Stack:**

- Node.js
- RabbitMQ
- SQL Server
- Power BI

**Usage:**

1. Start the service with:
   ```bash
   npm start
   ```
2. Ensure the .env file is configured with RabbitMQ and SQL Server details.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

### Contact

For questions or support, please contact [Srishti Ahirwar](mailto:ahirwar.s@northeastern.edu).
