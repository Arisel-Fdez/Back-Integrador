import { Request, Response } from "express";
import { ViewPublicationsUseCase } from "../../application/viewPublicationUseCase";
import * as admin from 'firebase-admin';

export class ViewPublicationsController {
    constructor(readonly viewPublicationsUseCase: ViewPublicationsUseCase) {}

    async run(req: Request, res: Response) {
        const publications = await this.viewPublicationsUseCase.run();

        // Añade el token a la URL de multimedia de cada publicación
        const publicationsWithDownloadURLs = await Promise.all(publications.map(async publication => {
            if (publication.multimedia) {
                const bucket = admin.storage().bucket();
                const fileName = decodeURIComponent(publication.multimedia.split('/o/')[1].split('?alt=media')[0]);
                const file = bucket.file(fileName);

                try {
                    const [downloadURL] = await file.getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491'  // Esta fecha es solo un ejemplo, ajusta según tus necesidades
                    });
                    publication.multimedia = downloadURL;
                } catch (error) {
                    console.error("Error al obtener la URL de descarga:", error);
                }
            }
            return publication;
        }));

        res.status(200).send(publicationsWithDownloadURLs);
    }

    
}

