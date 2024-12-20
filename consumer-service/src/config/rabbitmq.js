require('dotenv').config(); 

const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAMES = ["bloodPressure_queue", "heartbeat_queue", "temperature_queue"]; 

async function connectToRabbitMQ() {
  try {
    return await amqp.connect(RABBITMQ_URL);
  } catch (error) {
    throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
  }
}

module.exports = { connectToRabbitMQ, QUEUE_NAMES };
