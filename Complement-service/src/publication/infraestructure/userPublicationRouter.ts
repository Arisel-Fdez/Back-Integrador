import express from "express";
import { 
    userPublicationController, 
    viewPublicationsController, 
    deletePublicationController, 
    viewImagesController,
    viewAudioController,
    viewGifsController,
    viewPDFsController,
    viewVideosController,
    getUserPublicationsController
} from "./dependencies";
import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 

export const userPublicationRouter = express.Router();


// Middleware de autenticación
userPublicationRouter.use(authMiddleware);

// Ruta para agregar una nueva publicación
userPublicationRouter.post(
    "/publish/:userId", 
    userPublicationController.run.bind(userPublicationController)
);

// Ruta para ver todas las publicaciones
userPublicationRouter.get(
    "/", 
    viewPublicationsController.run.bind(viewPublicationsController)
);

// Ruta para eliminar una publicación específica por su ID
userPublicationRouter.delete(
    "/publication/:id", 
    deletePublicationController.run.bind(deletePublicationController)
);

userPublicationRouter.get("/:userId/publications", getUserPublicationsController.run.bind(getUserPublicationsController));

// Ruta para obtener imágenes de Firebase
userPublicationRouter.get('/images', viewImagesController.run.bind(viewImagesController));

//Ruta para Obtener Audios Firebase
userPublicationRouter.get('/audios', viewAudioController.run.bind(viewAudioController));

//Ruta para Obtener gif Firebase
userPublicationRouter.get('/gif', viewGifsController.run.bind(viewGifsController));

//Ruta para Obtener video Firebase
userPublicationRouter.get('/videos', viewVideosController.run.bind(viewVideosController));

//Ruta para Obtener pdf Firebase
userPublicationRouter.get('/pdf', viewPDFsController.run.bind(viewPDFsController));