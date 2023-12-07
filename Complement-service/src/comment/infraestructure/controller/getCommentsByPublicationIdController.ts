import { GetCommentsByPublicationIdUseCase } from "../../application/getCommentsByPublicationIdUseCase";
import { Request, Response } from "express";

export class GetCommentsByPublicationIdController {
    constructor(private readonly getCommentsByPublicationIdUseCase: GetCommentsByPublicationIdUseCase) {}

    async run(req: Request, res: Response) {
        const { publicationId } = req.params;

        try {
            const comments = await this.getCommentsByPublicationIdUseCase.run(Number(publicationId));
            return res.status(200).json(comments);
        } catch (error) {
            console.error("Error en GetCommentsByPublicationIdController:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}
