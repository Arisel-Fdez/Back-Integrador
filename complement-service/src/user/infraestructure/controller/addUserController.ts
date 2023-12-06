import { Request, Response } from "express";
import { AddUserUseCase } from "../../application/addUserUseCase";
import bcrypt from 'bcrypt';
import multer from 'multer';
import * as admin from 'firebase-admin';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export class AddUsersController {
    constructor(readonly addUsesUseCase: AddUserUseCase) { }

    async run(req: Request, res: Response) {
        try {
            upload.single('profilePicture')(req, res, async (err) => {
                if (err) {
                    return res.status(400).send({ status: "error", message: "Error uploading image." });
                }

                let { name, last_name, email, password, profilePicture } = req.body;

                const saltRounds = 10;
                password = await bcrypt.hash(password, saltRounds);

                if (req.file) {
                    const bucket = admin.storage().bucket();
                    const blob = bucket.file(req.file.originalname);
                    const blobStream = blob.createWriteStream();

                    blobStream.on('error', (err : any) => {
                        console.error('Error uploading file:', err);
                        return res.status(500).send({ status: "error", message: "Error uploading image to Firebase." });
                    });

                    blobStream.on('finish', async () => {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/backsocialmovil.appspot.com/o/${encodeURI(blob.name)}?alt=media`;

                        let createdUsers = await this.addUsesUseCase.run(name, last_name, email, password, publicUrl);

                        if (createdUsers) {
                            return res.status(201).send({
                                status: "success",
                                data: {
                                    name: createdUsers.name,
                                    last_name: createdUsers.last_name,
                                    email: createdUsers.email,
                                    profilePicture: publicUrl
                                },
                                message: "Usuario ha sido creado exitosamente"
                            });
                        } else {
                            return res.status(400).send({
                                status: "error",
                                data: [],
                                validations: [], // TODO: implementar validaciones
                                message: "Error al crear Usuario nuevo, intentalo mas tarde"
                            });
                        }
                    });

                    blobStream.end(req.file.buffer);
                } else {
                    return res.status(400).send({ status: "error", message: "Profile picture is required." });
                }
            });
        } catch (error) {
            console.error("Error in AddUsersController:", error);
            res.status(500).send({
                status: "error",
                message: "Error interno del servidor"
            });
        }
    }
}
