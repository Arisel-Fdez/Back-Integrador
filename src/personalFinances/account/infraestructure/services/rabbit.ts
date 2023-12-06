import amqp from 'amqplib';
import { RabbitMQService } from '../../apllication/services/rabbit';

export class RabbitMQ implements RabbitMQService {
    
    private connection: amqp.Connection | null = null;

    async connect(): Promise<void> {
        this.connection = await amqp.connect('amqp://127.0.0.1');
    }

    async publishMessage(exchange: string, routingKey: string, message: any): Promise<void> {
        if (!this.connection) {
            throw new Error('RabbitMQ connection not established');
        }
        
        const channel = await this.connection.createChannel();
        await channel.assertExchange('create-act', 'direct', { durable: true });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
        console.log('Mensaje enviado [Y]', message)
    }
}