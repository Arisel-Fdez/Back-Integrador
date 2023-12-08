import { UserPublication } from "../domain/userPublication";
import { UserPublicationRepository } from "../domain/userPublicationRepository";
import { validateOrReject } from 'class-validator';
import { UserPublicationValidation } from '../domain/validation/userPublicationValidation';

export class UserPublicationUseCase {
    constructor(readonly userPublicationRepository: UserPublicationRepository) {}

    async run(userId: number, description: string, multimedia: string): Promise<UserPublication | null> {
        try {
            // Crea una instancia de la clase de validación
            const validation = new UserPublicationValidation(userId, description, multimedia);

            // Verifica la validación
            try {
                await validateOrReject(validation);
            } catch (errors) {
                // Maneja los errores de validación
                console.error('Errores de validación:', errors);
                return null;
            }

            // Continúa con la lógica del caso de uso si la validación es exitosa
            const createdPublication = await this.userPublicationRepository.addPublication(userId, description, multimedia);
            return createdPublication;
        } catch (error) {
            console.error("Error in UserPublicationUseCase:", error);
            return null;
        }
    }
}
2