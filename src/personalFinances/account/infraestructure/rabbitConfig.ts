import amqp from 'amqplib';

export async function setupRabbitMQ() {
    const connection = await amqp.connect('amqp://127.0.0.1');
    const channel = await connection.createChannel();

    const queueName = 'act-queue';
    const exchangeName = 'create-act';
    const routingKey = 'create.acount';

    await channel.assertExchange(exchangeName, 'direct', { durable: true });


    await channel.assertQueue(queueName);
    await channel.bindQueue(queueName, exchangeName, routingKey);

    return { connection, channel, queueName };
}