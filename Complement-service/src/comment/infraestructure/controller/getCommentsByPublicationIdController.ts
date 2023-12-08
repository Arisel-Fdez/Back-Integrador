import { GetCommentsByPublicationIdUseCase } from "../../application/getCommentsByPublicationIdUseCase";
import { Request, Response } from "express";
import { HTTPStatusCodes } from "../../domain/validation/HTTPStatusCodes";

export class GetCommentsByPublicationIdController {
    constructor(private readonly getCommentsByPublicationIdUseCase: GetCommentsByPublicationIdUseCase) {}

    async run(req: Request, res: Response) {
        const { publicationId } = req.params;

        try {
            const comments = await this.getCommentsByPublicationIdUseCase.run(Number(publicationId));
            return res.status(HTTPStatusCodes.OK).json(comments); // Uso de HTTPStatusCodes
        } catch (error) {
            console.error("Error en GetCommentsByPublicationIdController:", error);
            return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error interno del servidor." }); // Uso de HTTPStatusCodes
        }
    }
}
