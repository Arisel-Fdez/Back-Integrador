import { UserPublication } from "../domain/userPublication";
import { UserPublicationRepository } from "../domain/userPublicationRepository";




export class DeletePublicationUseCase {
    constructor(readonly userPublicationRepository: UserPublicationRepository) {}

    async run(publicationId: string): Promise<void> {
        await this.userPublicationRepository.deletePublicationById(publicationId);
    }
}
