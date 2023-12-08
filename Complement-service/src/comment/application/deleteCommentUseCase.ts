// DeleteCommentUseCase.ts
import { CommentRepository } from "../domain/commentRepository";
import { DeleteCommentValidation } from "../domain/validation/deleteCommentValidation"; // Asegúrate de que la ruta de importación sea correcta
import { validate } from 'class-validator';

export class DeleteCommentUseCase {
    constructor(private readonly commentRepository: CommentRepository) {}

    async run(commentId: number): Promise<void> {
        const deleteCommentValidation = new DeleteCommentValidation(commentId);

        const errors = await validate(deleteCommentValidation);
        if (errors.length > 0) {
            console.error("Errores de validación:", errors);
            throw new Error("Errores de validación");
        }

        try {
            await this.commentRepository.deleteComment(commentId);
        } catch (error) {
            console.error("Error in DeleteCommentUseCase:", error);
            throw error;
        }
    }
}
