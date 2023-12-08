import { Request, Response } from "express";
import { ListAllUserUseCase } from "../../application/listAllUserUseCase";
import * as admin from 'firebase-admin';
import { HTTPStatusCodes } from "../../domain/validation/HTTPStatusCodes"; // Asegúrate de importar desde la ubicación correcta

export class ListAllUsersController {
    constructor(readonly listAllUserUseCase: ListAllUserUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const users = await this.listAllUserUseCase.run();

            const usersWithDownloadURLs = await Promise.all(users.map(async user => {
                if (user.profilePicture) {
                    const bucket = admin.storage().bucket();
                    const fileName = decodeURIComponent(user.profilePicture.split('/o/')[1].split('?alt=media')[0]);
                    const file = bucket.file(fileName);

                    try {
                        const [downloadURL] = await file.getSignedUrl({
                            action: 'read',
                            expires: '03-09-2491'
                        });
                        user.profilePicture = downloadURL;
                    } catch (error) {
                        console.error("Error al obtener la URL de descarga:", error);
                        // Opcional: establecer profilePicture en null o manejar el error de otra manera
                    }
                }
                return user;
            }));

            res.status(HTTPStatusCodes.OK).send(usersWithDownloadURLs);
        } catch (error) {
            console.error("Error en ListAllUsersController:", error);
            res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: "Error interno del servidor"
            });
        }
    }
}
