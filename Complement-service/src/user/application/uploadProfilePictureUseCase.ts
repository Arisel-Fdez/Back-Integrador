import { UserRepository } from "../domain/userRepository";

export class UploadProfilePictureUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async run(userId: string, profilePicture: string): Promise<boolean> {
        try {
            // Validación de userId y profilePicture
            if (!userId || !profilePicture) {
                throw { message: "UserId y profilePicture son requeridos" };
            }

            return await this.userRepository.updateProfilePicture(userId, profilePicture);
        } catch (error) {
            console.error("Error in UploadProfilePictureUseCase:", error);
            return false;
        }
    }
}
