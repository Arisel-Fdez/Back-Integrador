import { UserRepository } from "../domain/userRepository";
import { User } from "../domain/user";

export class DeleteUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async run(id: number): Promise<boolean> {
        try {
            const wasDeleted = await this.userRepository.deleteUserById(id);
            return wasDeleted;
        } catch (error) {
            console.error("Error in DeleteUserUseCase:", error);
            return false;
        }
    }
}