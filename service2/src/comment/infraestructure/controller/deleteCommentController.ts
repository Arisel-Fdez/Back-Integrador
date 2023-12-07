import { DeleteCommentUseCase } from "../../application/deleteCommentUseCase";
import { Request, Response } from "express";

export class DeleteCommentController {
    constructor(private readonly deleteCommentUseCase: DeleteCommentUseCase) {}

    async run(req: Request, res: Response) {
        const { commentId } = req.params;

        try {
            await this.deleteCommentUseCase.run(Number(commentId));
            return res.status(200).json({ message: "Comentario eliminado con éxito." });
        } catch (error) {
            console.error("Error en DeleteCommentController:", error);
            return res.status(404).json({ message: "Comentario no encontrado." });
        }
    }
}