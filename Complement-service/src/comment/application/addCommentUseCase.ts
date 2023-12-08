// AddCommentUseCase.ts
import { CommentRepository } from "../domain/commentRepository";
import { Comment } from "../domain/comment";
import { AddCommentValidation } from "../domain/validation/addCommentValidation"; // Asegúrate de que la ruta de importación sea correcta
import { validate } from 'class-validator';

export class AddCommentUseCase {
    constructor(private readonly commentRepository: CommentRepository) {}

    async run(publicationId: number, userId: number, content: string): Promise<Comment | null> {
        const commentValidation = new AddCommentValidation(publicationId, userId, content);

        const errors = await validate(commentValidation);
        if (errors.length > 0) {
            console.error("Errores de validación:", errors);
            return null; // o lanza una excepción, dependiendo de cómo quieras manejar los errores de validación
        }

        try {
            return await this.commentRepository.addComment(publicationId, userId, content);
        } catch (error) {
            console.error("Error in AddCommentUseCase:", error);
            return null;
        }
    }
}
