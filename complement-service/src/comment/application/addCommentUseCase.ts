import { CommentRepository } from "../domain/commentRepository";
import { Comment } from "../domain/comment";

export class AddCommentUseCase {
    constructor(private readonly commentRepository: CommentRepository) {}

    async run(publicationId: number, userId: number, content: string): Promise<Comment | null> {
        try {
            return await this.commentRepository.addComment(publicationId, userId, content);
        } catch (error) {
            console.error("Error in AddCommentUseCase:", error);
            return null;
        }
    }
}
