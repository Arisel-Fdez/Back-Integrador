import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { RabbitMQService } from "./services/rabbit";

export class AddUserUseCase {
    constructor(readonly userRepository: UserRepository, readonly rabbit: RabbitMQService) { }
    async run(name: string, last_name: string, email: string, password: string, profilePicture: string): Promise<User | null> {
        try {
            //conexion a rabbit
            await this.rabbit.connect();

            const createdUser = await this.userRepository.addUser(name, last_name, email, password, profilePicture);
            if (createdUser === null) {
                console.error("Error in addUserUseCase:");
                return null
            }

            //Creacion y publicacion de data con mensaje
            const data = {
                id: createdUser.id,
            };
            await this.rabbit.publishMessage('create-act', 'create.acount', { data });

            return createdUser;
        } catch (error) {
            console.error("Error in addUserUseCase:", error);
            return null;
        }
    }
}