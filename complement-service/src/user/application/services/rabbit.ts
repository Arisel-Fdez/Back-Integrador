export interface RabbitMQService {
  connect(): Promise<void>;
  publishMessage(exchange: string, routingKey: string, message: any): Promise<void>;
}
//use case para publicar mensaje segun arq hexagonal