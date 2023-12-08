import { validate } from 'class-validator';
import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { RabbitMQService } from "./services/rabbit";
import { UserValidation } from '../domain/validation/userValidation'; // Asegúrate de importar desde la ubicación correcta

export class AddUserUseCase {
    constructor(readonly userRepository: UserRepository, readonly rabbit: RabbitMQService) {}

    async run(name: string, last_name: string, email: string, password: string): Promise<User | null> {
        // Crear una instancia de UserValidation
        const userValidation = new UserValidation(name, last_name, email, password);

        // Validar la instancia
        const errors = await validate(userValidation);
        if (errors.length > 0) {
            throw { message: 'Validation failed!', errors };
        }

        try {
            // Conexión a RabbitMQ
            await this.rabbit.connect();

            // Crea el usuario sin foto de perfil
            const createdUser = await this.userRepository.addUser(name, last_name, email, password);
            
            if (createdUser === null) {
                console.error("Error in addUserUseCase: Failed to create user");
                throw new Error("Failed to create user");
            }

            // Publicación de mensaje en RabbitMQ
            const data = { id: createdUser.id };
            await this.rabbit.publishMessage('create-act', 'create.acount', { data });

            return createdUser;
        } catch (error) {
            console.error("Error in addUserUseCase:", error);
            throw error;
        }
    }
}
