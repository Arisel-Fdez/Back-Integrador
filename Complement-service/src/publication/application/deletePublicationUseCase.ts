import { UserPublicationRepository } from "../domain/userPublicationRepository";
import { PublicationIdValidation } from "../domain/validation/publicationIdValidation"; // Importa la validación

export class DeletePublicationUseCase {
    constructor(readonly userPublicationRepository: UserPublicationRepository) {}

    async run(publicationId: PublicationIdValidation): Promise<void> {
        // Realiza la eliminación solo si la validación pasa
        await this.userPublicationRepository.deletePublicationById(publicationId.id);
    }
}
