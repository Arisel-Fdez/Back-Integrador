import { Request, Response } from "express";
import { AddCoordinateUseCase } from "../../application/addCoordinateUseCase";

export class CoordinateController {
    constructor(private readonly addCoordinateUseCase: AddCoordinateUseCase) {}

    async run(req: Request, res: Response) {
        const { userId, latitude, longitude } = req.body;

        try {
            const coordinate = await this.addCoordinateUseCase.run(userId, latitude, longitude);
            return res.status(201).json(coordinate);
        } catch (error) {
            console.error("Error en CoordinateController:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}
