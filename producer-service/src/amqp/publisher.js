const { createChannel } = require("./amqpConnection");
const { handleError } = require('../utils/errorhandler');

let channels = {}; // Store channels for reuse

async function getOrCreateChannel(exchangeName, queueName, routingKey) {
  // Reuse an existing channel if available
  if (channels[queueName]) {
    return channels[queueName];
  }

  const channel = await createChannel(exchangeName, queueName, routingKey);
  channels[queueName] = channel;
  return channel;
}

async function publishMessages(queue_name,patient_data) {
  const exchangeName = "patient_data_exchange";
  const queueName = queue_name;
  const routingKey = queue_name;

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

  } catch (error) {
    handleError(`publishing messages to exchange ${exchangeName}`, error);
  }
}

module.exports = { publishMessages };
