import { Like } from "../domian/like";
import { LikeRepository } from "../domian/likeRepository";
import LikeModel from "./models/likeModel";

export class PgsqlLikeRepository implements LikeRepository {

    async addLike(publicationId: string, userId: string): Promise<Like | null> {
        try {
            const createdLike = await LikeModel.create({ publicationId, userId, timestamp: new Date() });
            return new Like(createdLike.id, createdLike.publicationId, createdLike.userId, createdLike.timestamp);
        } catch (error) {
            console.error("Error in PgsqlLikeRepository:", error);
            return null;
        }
    }

    async removeLike(publicationId: string, userId: string): Promise<boolean> {
        try {
            const result = await LikeModel.destroy({
                where: {
                    publicationId: publicationId,
                    userId: userId
                }
            });
            return result > 0; // true si se eliminó al menos un registro, false en caso contrario
        } catch (error) {
            console.error("Error in PgsqlLikeRepository:", error);
            return false;
        }
    }

    async countLikesByPublication(publicationId: string): Promise<number> {
        try {
            const count = await LikeModel.count({
                where: {
                    publicationId: publicationId
                }
            });
            return count;
        } catch (error) {
            console.error("Error in PgsqlLikeRepository:", error);
            return 0;
        }
    }
}
