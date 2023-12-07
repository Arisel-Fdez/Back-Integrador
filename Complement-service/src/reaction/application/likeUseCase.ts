import { Like } from "../domian/like";
import { LikeRepository } from "../domian/likeRepository";

export class LikeUseCase {
    constructor(readonly likeRepository: LikeRepository) {}

    async addLike(publicationId: string, userId: string): Promise<Like | null> {
        try {
            return await this.likeRepository.addLike(publicationId, userId);
        } catch (error) {
            console.error("Error in LikeUseCase:", error);
            return null;
        }
    }

    async removeLike(publicationId: string, userId: string): Promise<boolean> {
        try {
            return await this.likeRepository.removeLike(publicationId, userId);
        } catch (error) {
            console.error("Error in LikeUseCase:", error);
            return false;
        }
    }

    async countLikesByPublication(publicationId: string): Promise<number> {
        try {
            return await this.likeRepository.countLikesByPublication(publicationId);
        } catch (error) {
            console.error("Error in LikeUseCase:", error);
            return 0;
        }
    }
}
