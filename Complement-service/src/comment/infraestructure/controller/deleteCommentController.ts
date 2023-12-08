// DeleteCommentController.ts
import { Request, Response } from "express";
import { DeleteCommentUseCase } from "../../application/deleteCommentUseCase";
import { DeleteCommentValidation } from '../../domain/validation/deleteCommentValidation'; // Asegúrate de que la ruta de importación sea correcta
import { validate } from 'class-validator';
import { HTTPStatusCodes } from '../../domain/validation/HTTPStatusCodes'; // Importa HTTPStatusCodes

export class DeleteCommentController {
    constructor(private readonly deleteCommentUseCase: DeleteCommentUseCase) {}

    async run(req: Request, res: Response) {
        const { commentId } = req.params;

        const deleteCommentValidation = new DeleteCommentValidation(Number(commentId));

        const errors = await validate(deleteCommentValidation);
        if (errors.length > 0) {
            return res.status(HTTPStatusCodes.BAD_REQUEST).json({ errors });
        }

        try {
            await this.deleteCommentUseCase.run(Number(commentId));
            return res.status(HTTPStatusCodes.OK).json({ message: "Comentario eliminado con éxito." });
        } catch (error) {
            console.error("Error en DeleteCommentController:", error);
            return res.status(HTTPStatusCodes.NOT_FOUND).json({ message: "Comentario no encontrado." });
        }
    }
}
