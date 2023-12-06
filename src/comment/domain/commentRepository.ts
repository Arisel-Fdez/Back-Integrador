import { Comment } from "./comment";

export interface CommentRepository {
    addComment(publicationId: number, userId: number, content: string): Promise<Comment | null>;
    deleteComment(commentId: number): Promise<void>;
    getCommentsByUserId(userId: number): Promise<Comment[]>;
    getCommentsByPublicationId(publicationId: number): Promise<Comment[]>;
}
