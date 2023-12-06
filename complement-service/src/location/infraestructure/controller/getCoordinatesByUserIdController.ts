import { Request, Response } from "express";
import { GetCoordinatesByUserIdUseCase } from "../../application/getCoordinatesByUserIdUseCase ";

export class GetCoordinatesByUserIdController {
    constructor(private readonly getCoordinatesByUserIdUseCase: GetCoordinatesByUserIdUseCase) {}

    async run(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const coordinates = await this.getCoordinatesByUserIdUseCase.run(Number(userId));
            return res.status(200).json(coordinates);
        } catch (error) {
            console.error("Error en GetCoordinatesByUserIdController:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}
