# Producer Service for Patient Data Simulator

This Node.js service receives patient data through an API endpoint, publishes the data to RabbitMQ using direct exchanges and routing keys, and handles errors.

## Project Structure

├── producer-service/
├── src/ │
├── amqp/ │ │
├── amqpConnection.js # AMQP connection and channel setup
├── publisher.js # Publishes messages to RabbitMQ
├── utils/ │ │
├── errorHandler.js # Error handling utility
├── routes/
├── patient.js # API route for handling incoming patient data
├── server.js # Main server file
├── .env # Environment variables (e.g., RabbitMQ URL)
├── package.json # Project metadata and dependencies
├── README.md # Project documentation
└── LICENSE # License information

## Getting Started

### Prerequisites

- Node.js
- RabbitMQ server
- MySQL database (optional, for the consumer service)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd producer-service
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and set your environment variables:
   ```env
   RABBITMQ_URL=amqp://localhost
   PORT=3000
   ```

### Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Send a POST request to `/api/send` with the patient data in the request payload:

   ```json
   {
     "id": "123",
     "deviceType": "heartbeat",
     "heartbeat": 72,
     "pulse": 75,
     "timestamp": "2024-09-16T12:34:56Z"
   }

   {
     "id": "123",
     "deviceType": "bloodPressure",
     "systolic": "123",
     "diastolic": "71",
     "timestamp": "2024-09-16T12:34:56Z"
   }

   {
     "id": "123",
     "deviceType": "temperature",
     "temperature": "37.2",
     "timestamp": "2024-09-16T12:34:56Z"
   }

   ```

### Files Description

- **`src/amqp/amqpConnection.js`**: Handles the AMQP connection and channel creation.
- **`src/amqp/publisher.js`**: Publishes patient data messages to the specified RabbitMQ exchange and queue.
- **`src/utils/errorHandler.js`**: Provides a utility function for centralized error handling.
- **`src/routes/patient.js`**: Defines the `/api/send` endpoint for receiving patient data and invoking the publisher.
- **`src/server.js`**: Initializes the Express server and sets up the routes.

### Error Handling

Errors during AMQP connection or message publishing are logged using the `handleError` utility function in `src/utils/errorhandler.js`.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

### Contact

For questions or support, please contact [Srishti Ahirwar](mailto:ahirwar.s@northeastern.edu).