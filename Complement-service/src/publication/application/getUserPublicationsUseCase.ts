import { UserPublicationRepository } from "../domain/userPublicationRepository";
import { UserPublication } from "../domain/userPublication";
import { UserIdValidation } from "../domain/validation/userIdValidation"; // Importa la validación

export class GetUserPublicationsUseCase {
    constructor(private readonly userPublicationRepository: UserPublicationRepository) {}

    async run(userId: UserIdValidation): Promise<UserPublication[]> {
        // Realiza la búsqueda de publicaciones solo si la validación pasa
        return this.userPublicationRepository.getPublicationsByUserId(userId.id);
    }
}
