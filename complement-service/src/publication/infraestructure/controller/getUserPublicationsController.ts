// GetUserPublicationsController.js

import { Request, Response } from "express";
import * as admin from 'firebase-admin';
import { GetUserPublicationsUseCase } from "../../application/getUserPublicationsUseCase";

export class GetUserPublicationsController {
    constructor(private readonly getUserPublicationsUseCase: GetUserPublicationsUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            if (isNaN(userId)) {
                return res.status(400).send({ status: "error", message: "ID de usuario inválido." });
            }

            let publications = await this.getUserPublicationsUseCase.run(userId);

            // Procesa cada publicación para obtener URLs firmadas
            publications = await Promise.all(publications.map(async publication => {
                publication = await this.processPublication(publication);
                return publication;
            }));

            res.status(200).send({ status: "success", data: publications });
        } catch (error) {
            console.error("Error en GetUserPublicationsController:", error);
            res.status(500).send({ status: "error", message: "Error interno del servidor." });
        }
    }

    async processPublication(publication: any) {
        const bucket = admin.storage().bucket();

        if (publication.multimedia) {
            publication.multimedia = await this.getSignedUrl(bucket, publication.multimedia);
        }

        if (publication.userProfile) {
            publication.userProfile = await this.getSignedUrl(bucket, publication.userProfile);
        }

        return publication;
    }

    async getSignedUrl(bucket: any, url : any) {
        try {
            const fileName = decodeURIComponent(url.split('/o/')[1].split('?')[0]);
            const file = bucket.file(fileName);

            const [downloadURL] = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491' // Ajusta la fecha de expiración según tus necesidades
            });
            return downloadURL;
        } catch (error) {
            console.error("Error al obtener la URL de descarga:", error);
            return url; // Devuelve la URL original en caso de error
        }
    }
}
