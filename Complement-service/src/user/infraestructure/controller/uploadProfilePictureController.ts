import { Request, Response } from "express";
import { UploadProfilePictureUseCase } from "../../application/uploadProfilePictureUseCase";
import * as admin from 'firebase-admin';
import multer from 'multer';
import { HTTPStatusCodes } from "../../domain/validation/HTTPStatusCodes"; // Asegúrate de importar desde la ubicación correcta

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('profilePicture');

export class UploadProfilePictureController {
    constructor(readonly uploadProfilePictureUseCase: UploadProfilePictureUseCase) { }

    async run(req: Request, res: Response) {
        try {
            
            upload(req, res, async (error) => {
                if (error) {
                    return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({ status: "error", message: "Error al subir la imagen." });
                }

                if (!req.file) {
                    return res.status(HTTPStatusCodes.BAD_REQUEST).send({ status: "error", message: "La imagen del perfil es requerida." });
                }

                const { userId } = req.body;
                if (!userId) {
                    return res.status(HTTPStatusCodes.BAD_REQUEST).send({ status: "error", message: "El userId es requerido." });
                }

                const filename = req.file.originalname;

                const bucket = admin.storage().bucket();
                const blob = bucket.file(filename);
                const blobStream = blob.createWriteStream();

                blobStream.on('error', err => {
                    console.error('Error al subir archivo:', err);
                    return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({ status: "error", message: "Error al subir imagen a Firebase." });
                });

                blobStream.on('finish', async () => {
                    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;

                    const isUploaded = await this.uploadProfilePictureUseCase.run(userId, publicUrl);

                    if (isUploaded) {
                        return res.status(HTTPStatusCodes.OK).send({
                            status: "success",
                            data: {
                                userId: userId,
                                profilePicture: publicUrl
                            },
                            message: "Imagen de perfil subida con éxito."
                        });
                    } else {
                        return res.status(HTTPStatusCodes.BAD_REQUEST).send({
                            status: "error",
                            message: "Error al subir la imagen de perfil. Usuario no encontrado o error interno del servidor."
                        });
                    }
                });

                blobStream.end(req.file.buffer);
            });
        } catch (error) {
            console.error("Error en UploadProfilePictureController:", error);
            res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({
                status: "error",
                message: "Error interno del servidor."
            });
        }
    }
}
