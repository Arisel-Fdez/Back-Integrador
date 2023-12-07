import CommentModel from './models/commentModel';
import UserModel from '../../user/infraestructure/models/userModel';
import { Comment } from '../domain/comment';
import { CommentRepository } from '../domain/commentRepository';

export class PgsqlCommentRepository implements CommentRepository {
    
    async addComment(publicationId: number, userId: number, content: string): Promise<Comment | null> {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) throw new Error('Usuario no encontrado.');

            const comment = await CommentModel.create({
                publicationId,
                userId,
                content
            });

            return new Comment(comment.id, user.id, comment.publicationId, comment.content);
        } catch (error) {
            console.error("Error in PgsqlCommentRepository:", error);
            return null;
        }
    }

    async deleteComment(commentId: number): Promise<void> {
        const comment = await CommentModel.findByPk(commentId);
        if (!comment) {
            throw new Error('Comentario no encontrado.');
        }
        await comment.destroy();
    }

    async getCommentsByUserId(userId: number): Promise<Comment[]> {
        const comments = await CommentModel.findAll({
            where: { userId },
            include: [{ model: UserModel, attributes: ['name'] }] // Asegúrate de que el nombre del campo coincida con tu modelo UserModel
        });
        return comments.map(comment => new Comment(
            comment.id, 
            comment.userId, 
            comment.publicationId, 
            comment.content,
            comment.user?.name // Suponiendo que 'name' es el campo para el nombre en UserModel
        ));
    }

    async getCommentsByPublicationId(publicationId: number): Promise<Comment[]> {
        const comments = await CommentModel.findAll({
            where: { publicationId },
            include: [{ model: UserModel, attributes: ['name'] }]
        });
        return comments.map(comment => new Comment(
            comment.id,
            comment.userId,
            comment.publicationId,
            comment.content,
            comment.user?.name
        ));
    }
}
