import { Request, Response } from "express";
import { AddUserUseCase } from "../../application/addUserUseCase";
import bcrypt from 'bcrypt';
import { HTTPStatusCodes } from "../../domain/validation/HTTPStatusCodes"; // Importa las constantes de estado HTTP

export class AddUsersController {
    constructor(readonly addUserUseCase: AddUserUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { name, last_name, email, password } = req.body;

            // Encriptación de la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Llama al UseCase para agregar al usuario
            const createdUser = await this.addUserUseCase.run(name, last_name, email, hashedPassword);

            if (createdUser) {
                return res.status(HTTPStatusCodes.CREATED).send({
                    status: "success",
                    data: {
                        name: createdUser.name,
                        last_name: createdUser.last_name,
                        email: createdUser.email,
                    },
                    message: "Usuario creado exitosamente"
                });
            } else {
                return res.status(HTTPStatusCodes.BAD_REQUEST).send({
                    status: "error",
                    message: "Error al crear el usuario, inténtalo más tarde"
                });
            }
        } catch (error: any) {
            if (error.message === 'Validation failed!') {
                return res.status(HTTPStatusCodes.BAD_REQUEST).send({
                    status: "error",
                    message: "Error de validación",
                    details: error.errors
                });
            }
            console.error("Error in AddUsersController:", error);
            res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: "Error interno del servidor"
            });
        }
    }
}
