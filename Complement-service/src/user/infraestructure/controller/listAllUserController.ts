import { Request, Response } from "express";
import { ListAllUserUseCase } from "../../application/listAllUserUseCase";
import * as admin from 'firebase-admin';

export class ListAllUsersController {
    constructor(readonly listAllUserUseCase: ListAllUserUseCase) {}

    async run(req: Request, res: Response) {
        const users = await this.listAllUserUseCase.run();

        // Añade el token a la URL de profilePicture de cada usuario
        const usersWithDownloadURLs = await Promise.all(users.map(async user => {
            if (user.profilePicture) {
                const bucket = admin.storage().bucket();
                // Suponiendo que profilePicture es el nombre del archivo en Firebase Storage
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

        res.status(200).send(usersWithDownloadURLs);
    }
}
