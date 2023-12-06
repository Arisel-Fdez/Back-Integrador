import { UserPublication } from "../domain/userPublication";
import { UserPublicationRepository } from "../domain/userPublicationRepository";

export class UserPublicationUseCase {
    constructor(readonly userPublicationRepository: UserPublicationRepository) {}

    async run(userId: number, description: string, multimedia: string): Promise<UserPublication | null> {
        try {
            const createdPublication = await this.userPublicationRepository.addPublication(userId, description, multimedia);
            return createdPublication;
        } catch (error) {
            console.error("Error in UserPublicationUseCase:", error);
            return null;
        }
    }
}
