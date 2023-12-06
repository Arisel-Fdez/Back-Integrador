import { CreateAccountUseCase } from "../../apllication/createAccountUseCase";
import { setupRabbitMQ } from "../rabbitConfig";

export async function startAccountConsumer(useCase:CreateAccountUseCase) {
    
    const { connection, channel, queueName } = await setupRabbitMQ();

    console.log('Consumidor de Órdenes esperando mensajes...');

    // Consume mensajes de la cola
    channel.consume(queueName, (msg) => {
        if (msg) {

            const content:any = JSON.parse(msg.content.toString());
            const currentDateTime = new Date();
            // Lógica para procesar la orden pagada

            console.log('Mensaje recibido [Y]', content )
            const userId = content.data.id;

            useCase.run(userId);
            
            // Marcar el mensaje como entregado (acknowledge)
            channel.ack(msg);
        }
    });
}