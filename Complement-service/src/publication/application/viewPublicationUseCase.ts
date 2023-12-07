import { UserPublication } from "../domain/userPublication";
import { UserPublicationRepository } from "../domain/userPublicationRepository";



export class ViewPublicationsUseCase {
    constructor(readonly userPublicationRepository: UserPublicationRepository) {}

    async run(): Promise<UserPublication[]> {
        return await this.userPublicationRepository.getAllPublications();
    }
}