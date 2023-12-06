import amqp from 'amqplib';

export async function setupRabbitMQ() {
    const connection = await amqp.connect('amqps://b-9d29a2d4-604e-4ebd-92c1-39952aad2d85.mq.us-east-1.amazonaws.com:5671');
    const channel = await connection.createChannel();
    const queueName = 'inventory-queue';
    const exchangeName = 'orders-exchange';
    const routingKey = 'order.paid';

    // Asegura que el intercambio esté declarado antes de la cola
    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    // Declara la cola y vincúlala al intercambio
    await channel.assertQueue(queueName);
    await channel.bindQueue(queueName, exchangeName, routingKey);

    return { connection, channel, queueName };
}
