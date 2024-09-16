const amqp = require('amqplib');
require('dotenv').config();
const { handleError } = require('../utils/errorhandler');

async function createChannel(exchangeName, queueName, routingKey) {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(exchangeName, 'direct', { durable: false });

        await channel.assertQueue(queueName, { durable: false });
        await channel.bindQueue(queueName, exchangeName, routingKey);

        return channel;
    } catch (error) {
        handleError('creating AMQP channel', error);
        throw error;
    }
}

module.exports = { createChannel };
