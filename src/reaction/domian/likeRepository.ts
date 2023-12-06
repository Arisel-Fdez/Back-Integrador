import { Like } from "./like";

export interface LikeRepository {
    addLike(publicationId: string, userId: string): Promise<Like | null>;
    removeLike(publicationId: string, userId: string): Promise<boolean>;
    countLikesByPublication(publicationId: string): Promise<number>;
}
