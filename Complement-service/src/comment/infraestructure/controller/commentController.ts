// CommentController.ts
import { Request, Response } from "express";
import { AddCommentUseCase } from "../../application/addCommentUseCase";
import { AddCommentValidation } from '../../domain/validation/addCommentValidation'; // Asegúrate de que la ruta de importación sea correcta
import { validate } from 'class-validator';
import { HTTPStatusCodes } from '../../domain/validation/HTTPStatusCodes'; // Importa HTTPStatusCodes

export class CommentController {
    constructor(private readonly addCommentUseCase: AddCommentUseCase) { }

    async run(req: Request, res: Response) {
        const { publicationId, userId } = req.params;
        const { content } = req.body;

        const commentValidation = new AddCommentValidation(Number(publicationId), Number(userId), content);

        const errors = await validate(commentValidation);
        if (errors.length > 0) {
            return res.status(HTTPStatusCodes.BAD_REQUEST).json({ errors });
        }

        try {
            const comment = await this.addCommentUseCase.run(Number(publicationId), Number(userId), content);
            if (comment) {
                return res.status(HTTPStatusCodes.CREATED).json(comment);
            } else {
                return res.status(HTTPStatusCodes.BAD_REQUEST).json({ message: "No se pudo crear el comentario." });
            }
        } catch (error) {
            console.error("Error en CommentController:", error);
            return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error interno del servidor." });
        }
    }
}
