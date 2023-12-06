import  express  from "express";

import { 
    commentController, deleteCommentController, getCommentsByPublicationIdController, getCommentsByUserIdController
    // otros controladores que necesite
} from "./dependencies";

import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 

export const commentRouter = express.Router();

// Middleware de autenticación
commentRouter.use(authMiddleware);

// Ruta para agregar un nuevo comentario a una publicación
commentRouter.post(
    "/publication/:publicationId/usercomment/:userId", 
    commentController.run.bind(commentController)
);

commentRouter.delete(
    "/comment/:commentId", 
    deleteCommentController.run.bind(deleteCommentController)
);

// Ruta para obtener los comentarios de un usuario por su ID
commentRouter.get(
    "/user/:userId/comments", 
    getCommentsByUserIdController.run.bind(getCommentsByUserIdController)
);

commentRouter.get(
    "/publication/:publicationId", 
    getCommentsByPublicationIdController.run.bind(getCommentsByPublicationIdController)
);

