const { createChannel } = require("./amqpConnection");
const { handleError } = require('../utils/errorhandler');

let channels = {}; // Store channels for reuse

async function getOrCreateChannel(exchangeName, queueName, routingKey) {
  // Reuse an existing channel if available
  if (channels[queueName]) {
    return channels[queueName];
  }

  // Create a new channel and store it for reuse
  const channel = await createChannel(exchangeName, queueName, routingKey);
  channels[queueName] = channel;
  return channel;
}

async function publishMessages(patient_data) {
  const exchangeName = "patient_data_exchange";
  const queueName = `P_${patient_data.id}`;
  const routingKey = `P_${patient_data.id}`;

  try {
    const channel = await getOrCreateChannel(
      exchangeName,
      queueName,
      routingKey
    );


    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(patient_data))
    );

    /**
    // Publish messages every 5 seconds
    setInterval(() => {
      try {
        const message = generateMeasurement(patientId);
        // Publish to the exchange
        channel.publish(
          exchangeName,
          routingKey,
          Buffer.from(JSON.stringify(message))
        );
        console.log(
          `Sent to ${exchangeName} with routing key ${routingKey}: ${JSON.stringify(
            message
          )}`
        );
      } catch (error) {
        handleError(`publishing message to exchange ${exchangeName}`, error);
      }
    }, 5000);
    **/
  } catch (error) {
    handleError(`publishing messages to exchange ${exchangeName}`, error);
  }
}

module.exports = { publishMessages };
