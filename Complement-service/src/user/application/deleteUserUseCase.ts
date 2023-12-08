import { validate } from 'class-validator';
import { UserRepository } from "../domain/userRepository";
import { UserIdValidation } from '../domain/validation/userIdValidation'; // Importa la clase de validación

export class DeleteUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async run(id: number): Promise<boolean> {
        // Validación del ID
        const idValidation = new UserIdValidation(id);
        const errors = await validate(idValidation);
        if (errors.length > 0) {
            throw { message: 'Validation failed!', errors };
        }

        try {
            const wasDeleted = await this.userRepository.deleteUserById(id);
            return wasDeleted;
        } catch (error) {
            console.error("Error in DeleteUserUseCase:", error);
            throw error; // Lanzar el error en lugar de devolver false
        }
    }
}
