import amqp from 'amqplib';
import { RabbitMQService } from '../../apllication/services/rabbit';

export class RabbitMQ implements RabbitMQService {
    
    private connection: amqp.Connection | null = null;

    async connect(): Promise<void> {
        this.connection = await amqp.connect('amqp://127.0.0.1');
    }

    async publishMessage(exchange: string, routingKey: string, message: any): Promise<void> {
        if (!this.connection) {
            throw new Error('not established');
        }
        
        const channel = await this.connection.createChannel();
        await channel.assertExchange('create-act', 'direct', { durable: true });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
        console.log('Mensaje enviado [Y]', message)
    }
}
//amqps://SOA:yeremi224224@b-9d29a2d4-604e-4ebd-92c1-39952aad2d85.mq.us-east-1.amazonaws.com:5671