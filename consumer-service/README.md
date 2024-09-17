# Consumer Service

This project is a consumer service that processes messages from various device queues, stores the data in an SQL Server database, and sends it to Power BI for streaming. It is designed to handle health data from different devices, including heartbeat, blood pressure, and temperature.

## Features

- Consumes messages from RabbitMQ queues for various device data.
- Stores the received data into SQL Server databases.
- Sends data to Power BI streaming datasets.
- Configurable to handle multiple device types and queues.
- Implements error handling for message processing and data storage.

## Folder Structure

consumer-service/
├── src/
│ ├── config/
│ │ └── database.js # Contains database connection and initialization logic
│ │ └── rabbitmq.js # Contains RabbitMQ connection and queue configuration
│ ├── services/
│ │ └── databaseService.js # Contains logic for saving data to the database
│ │ └── messageConsumer.js # Contains logic for consuming messages from queues
│ ├── utils/
│ │ └── errorhandler.js # Contains error handling logic
│ └── index.js # Entry point for the consumer service
├── .env # Environment variables for configuration
├── package.json # Project metadata and dependencies
├── README.md # Project documentation
└── LICENSE # License information

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- RabbitMQ
- SQL Server
- Power BI

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/consumer-service.git
   cd consumer-service
   ```

## Install dependencies:

```bash
npm install
```

## Configuration:

1. **Database**: Set the following environment variables in the .env file for SQL Server connection:

```bash
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=your_db_server
DB_DATABASE=your_db_database
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true
```

2. **RabbitMQ**: Set the RabbitMQ URL in the .env file:

```bash
RABBITMQ_URL=your_rabbitmq_url
```

3. **Power BI**: Set the Power BI streaming dataset URLs in the .env file:

```bash
POWER_BI_URLS_heartbeat=your_power_bi_heartbeat_url
POWER_BI_URLS_bloodPressure=your_power_bi_blood_pressure_url
POWER_BI_URLS_temperature=your_power_bi_temperature_url
```

## Usage

Run the following command to start the service:

```bash
npm start
```

## Example Output

When the service is running successfully, it processes messages and logs the results:

```css
Received message from bloodPressure_queue: {
  id: 1,
  systolic: 120,
  diastolic: 80,
  timestamp: '2024-09-17T12:00:00Z'
}
Data saved to blood_pressure_data table: {
  id: 1,
  systolic: 120,
  diastolic: 80,
  timestamp: '2024-09-17T12:00:00Z'
}
Data sent to Power BI: bloodPressure
```

**If an error occurs, it will be logged:**

Error saving data to database: Error: SQL Server error!
Error sending data to Power BI: Error: HTTP error! Status: 500

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

### Contact

For questions or support, please contact [Srishti Ahirwar](mailto:ahirwar.s@northeastern.edu).
