import { GetCommentsByUserIdUseCase } from "../../application/getCommentsByUserIdUseCase";
import { Request, Response } from "express";

export class GetCommentsByUserIdController {
    constructor(private readonly getCommentsByUserIdUseCase: GetCommentsByUserIdUseCase) {}

    async run(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const comments = await this.getCommentsByUserIdUseCase.run(Number(userId));
            return res.status(200).json(comments);
        } catch (error) {
            console.error("Error en GetCommentsByUserIdController:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}