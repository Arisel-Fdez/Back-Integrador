import amqp from 'amqplib';

export async function setupRabbitMQ() {
    const connection = await amqp.connect('amqps://SOA:yeremi224224@b-9d29a2d4-604e-4ebd-92c1-39952aad2d85.mq.us-east-1.amazonaws.com:5671');
    const channel = await connection.createChannel();

    const queueName = 'act-queue';
    const exchangeName = 'create-act';
    const routingKey = 'create.acount';

    await channel.assertExchange(exchangeName, 'direct', { durable: true });


    await channel.assertQueue(queueName);
    await channel.bindQueue(queueName, exchangeName, routingKey);

    return { connection, channel, queueName };
}