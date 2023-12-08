import { Request, Response } from "express";
import { UserPublicationUseCase } from "../../application/userPublicationUserCase";
import multer from 'multer';
import * as admin from 'firebase-admin';
import { HTTPStatusCodes } from '../../domain/validation/HTTPStatusCodes'; // Asegúrate de que la ruta de importación sea correcta

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export class UserPublicationController {
    constructor(private readonly userPublicationUseCase: UserPublicationUseCase) { }

    async run(req: Request, res: Response) {
        try {
            upload.single('multimedia')(req, res, async (err) => {
                if (err) {
                    return res.status(HTTPStatusCodes.BAD_REQUEST).send({ status: "error", message: "Error al subir multimedia." });
                }

                const userId: number = parseInt(req.params.userId);
                const description: string = req.body.description;

                if (req.file) {
                    const bucket = admin.storage().bucket();
                    const blob = bucket.file(req.file.originalname);
                    const blobStream = blob.createWriteStream();

                    blobStream.on('error', (err) => {
                        console.error('Error al subir archivo:', err);
                        return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({ status: "error", message: "Error al subir multimedia a Firebase." });
                    });

                    blobStream.on('finish', async () => {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/backsocialmovil.appspot.com/o/${encodeURIComponent(blob.name)}?alt=media`;

                        let createdPublication;
                        try {
                            createdPublication = await this.userPublicationUseCase.run(userId, description, publicUrl);
                        } catch (useCaseError) {
                            console.error('Error al crear la publicación:', useCaseError);
                            return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({ status: "error", message: "Error al procesar la publicación." });
                        }

                        if (createdPublication) {
                            return res.status(HTTPStatusCodes.CREATED).send({
                                status: "success",
                                data: {
                                    id: createdPublication.id,
                                    description: createdPublication.description,
                                    multimedia: publicUrl
                                },
                                message: "Publicación creada exitosamente."
                            });
                        } else {
                            return res.status(HTTPStatusCodes.BAD_REQUEST).send({
                                status: "error",
                                data: [],
                                message: "No se pudo crear la publicación, intente más tarde."
                            });
                        }
                    });

                    blobStream.end(req.file.buffer);
                } else {
                    return res.status(HTTPStatusCodes.BAD_REQUEST).send({ status: "error", message: "Se requiere multimedia." });
                }
            });
        } catch (error) {
            console.error("Error en UserPublicationController:", error);
            res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: "Error interno del servidor."
            });
        }
    }
}
