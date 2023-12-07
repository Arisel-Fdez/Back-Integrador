import { UserPublication } from "../domain/userPublication";
import { UserPublicationRepository } from "../domain/userPublicationRepository";

export class GetUserPublicationsUseCase {
    constructor(private readonly userPublicationRepository: UserPublicationRepository) {}

    async run(userId: number): Promise<UserPublication[]> {
        return this.userPublicationRepository.getPublicationsByUserId(userId);
    }
}
