import { Request, Response } from "express";
import { DeletePublicationUseCase } from "../../application/deletePublicationUseCase";
import { PublicationIdValidation } from "../../domain/validation/publicationIdValidation"; // Importa la validación
import { validate } from 'class-validator'; // Importa la función de validación
import { HTTPStatusCodes } from "../../domain/validation/HTTPStatusCodes"; // Importa los códigos de respuesta HTTP

export class DeletePublicationController {
    constructor(private readonly deletePublicationUseCase: DeletePublicationUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const publicationId = req.params.id; // Asumo que pasas el ID de la publicación como parámetro en la URL
            const publicationIdValidation = new PublicationIdValidation(publicationId); // Valida el ID de la publicación

            // Verifica si la validación falla y devuelve un código de respuesta HTTP 400 si es así
            const validationErrors = await validate(publicationIdValidation);
            if (validationErrors.length > 0) {
                return res.status(HTTPStatusCodes.BAD_REQUEST).send({
                    status: "error",
                    message: "Errores de validación en los parámetros de entrada.",
                    validationErrors,
                });
            }

            // Ejecuta el caso de uso con la validación
            await this.deletePublicationUseCase.run(publicationIdValidation);

            res.status(HTTPStatusCodes.OK).send({
                status: "success",
                message: "Publicación eliminada exitosamente."
            });

        } catch (error) {
            console.error("Error en DeletePublicationController:", error);
            res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: "Error interno del servidor."
            });
        }
    }
}
