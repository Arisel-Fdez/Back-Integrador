import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/deleteUserUseCase";
import { HTTPStatusCodes } from "../../domain/validation/HTTPStatusCodes"; // Importa las constantes de estado HTTP

export class DeleteUserController {
    constructor(readonly deleteUserUseCase: DeleteUserUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const wasDeleted = await this.deleteUserUseCase.run(Number(id));

            if (wasDeleted) {
                return res.status(HTTPStatusCodes.OK).send({
                    status: "success",
                    message: "Usuario eliminado exitosamente"
                });
            }

            res.status(HTTPStatusCodes.NOT_FOUND).send({
                status: "error",
                message: "Usuario no encontrado"
            });
        } catch (error: any) {
            if (error.message === 'Validation failed!') {
                return res.status(HTTPStatusCodes.BAD_REQUEST).send({
                    status: "error",
                    message: "Error de validación",
                    details: error.errors
                });
            }
            console.error("Error in DeleteUserController:", error);
            res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: "Error interno del servidor"
            });
        }
    }
}
