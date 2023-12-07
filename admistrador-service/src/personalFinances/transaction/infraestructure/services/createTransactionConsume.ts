import { CreateTransactionUseCase } from "../../apllication/createTransactionUseCase";
import { setupRabbitMQ } from "../rabbitConfig";

export async function startOrderConsumer(useCase: CreateTransactionUseCase) {

    const { connection, channel, queueName } = await setupRabbitMQ();

    console.log('Consumidor de Órdenes esperando mensajes...');

    // Consume mensajes de la cola
    channel.consume(queueName, (msg) => {
        if (msg) {

            const content: any = JSON.parse(msg.content.toString());
            const currentDateTime = new Date();
            // Lógica para procesar la orden pagada

            console.log('Mensaje recibido [Y]', content)
            const id = content.data.id;
            const type = content.data.type;
            const balance = content.data.balance;
            const description = content.data.description;
            const categoryId = content.data.categoryId;
            useCase.run(currentDateTime, type, balance, description, categoryId, id);

            // Marcar el mensaje como entregado (acknowledge)
            channel.ack(msg);
        }
    });
}