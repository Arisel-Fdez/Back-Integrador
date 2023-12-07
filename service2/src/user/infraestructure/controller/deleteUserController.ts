import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/deleteUserUseCase";

export class DeleteUserController {
    constructor(readonly deleteUserUseCase: DeleteUserUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const wasDeleted = await this.deleteUserUseCase.run(Number(id));

            if (wasDeleted) {
                return res.status(200).send({
                    status: "success",
                    message: "Usuario eliminado exitosamente"
                });
            }

            res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            });
        } catch (error) {
            console.error("Error in DeleteUserController:", error);
            res.status(500).send({
                status: "error",
                message: "Error interno del servidor"
            });
        }
    }
}