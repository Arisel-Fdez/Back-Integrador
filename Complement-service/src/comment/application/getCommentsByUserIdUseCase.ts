import { CommentRepository } from "../domain/commentRepository";
import { Comment } from "../domain/comment";


export class GetCommentsByUserIdUseCase {
    constructor(private readonly commentRepository: CommentRepository) {}

    async run(userId: number): Promise<Comment[]> {
        return this.commentRepository.getCommentsByUserId(userId);
    }
}