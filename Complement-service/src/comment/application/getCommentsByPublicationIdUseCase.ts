import { CommentRepository } from "../domain/commentRepository";
import { Comment } from "../domain/comment";

export class GetCommentsByPublicationIdUseCase {
    constructor(private readonly commentRepository: CommentRepository) {}

    async run(publicationId: number): Promise<Comment[]> {
        return this.commentRepository.getCommentsByPublicationId(publicationId);
    }
}
