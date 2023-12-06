import { Request, Response } from "express";
import { AddCommentUseCase } from "../../application/addCommentUseCase";

export class CommentController {
    constructor(private readonly addCommentUseCase: AddCommentUseCase) { }

    async run(req: Request, res: Response) {
        const { publicationId, userId } = req.params;
        const { content } = req.body;

        try {
            const comment = await this.addCommentUseCase.run(Number(publicationId), Number(userId), content);
            if (comment) {
                return res.status(201).json(comment);
            } else {
                return res.status(400).json({ message: "No se pudo crear el comentario." });
            }
        } catch (error) {
            console.error("Error en CommentController:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}
