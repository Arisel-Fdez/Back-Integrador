import { GetCommentsByUserIdUseCase } from "../../application/getCommentsByUserIdUseCase";
import { Request, Response } from "express";
import { HTTPStatusCodes } from "../../domain/validation/HTTPStatusCodes";


export class GetCommentsByUserIdController {
    constructor(private readonly getCommentsByUserIdUseCase: GetCommentsByUserIdUseCase) {}

    async run(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const comments = await this.getCommentsByUserIdUseCase.run(Number(userId));
            return res.status(HTTPStatusCodes.OK).json(comments); // Uso de HTTPStatusCodes.OK en lugar de 200
        } catch (error) {
            console.error("Error en GetCommentsByUserIdController:", error);
            return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error interno del servidor." }); // Uso de HTTPStatusCodes.INTERNAL_SERVER_ERROR en lugar de 500
        }
    }
}
