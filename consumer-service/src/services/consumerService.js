const { connectToRabbitMQ, QUEUE_NAMES } = require("../config/rabbitmq");
const { connectToDatabase, initializeDatabase } = require('../config/database');
const { saveToDatabase } = require('./databaseService');
const { handleError } = require("../utils/errorhandler");

async function consumeMessages() {
  try {
    const rabbitConnection = await connectToRabbitMQ();
    const channel = await rabbitConnection.createChannel();
    const dbConnection = await connectToDatabase();

    // Ensure the database is initialized
    await initializeDatabase();

    for (const queueName of QUEUE_NAMES) {
      await channel.assertQueue(queueName, { durable: false });
      console.log(`Waiting for messages in ${queueName}`);

      channel.consume(
        queueName,
        async (message) => {
          if (message !== null) {
            const data = JSON.parse(message.content.toString());
            console.log(`Received message from ${queueName}:`, data);
            await saveToDatabase(dbConnection, data);
            channel.ack(message);
          }
        },
        { noAck: false }
      );
    }
  } catch (error) {
    handleError("consuming messages", error);
  }
}

module.exports = { consumeMessages };
