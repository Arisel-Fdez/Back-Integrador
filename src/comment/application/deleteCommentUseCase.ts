import { CommentRepository } from "../domain/commentRepository";


export class DeleteCommentUseCase {
    constructor(private readonly commentRepository: CommentRepository) {}

    async run(commentId: number): Promise<void> {
        return this.commentRepository.deleteComment(commentId);
    }
}