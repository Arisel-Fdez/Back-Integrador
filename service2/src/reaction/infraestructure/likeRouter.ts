import express from "express";
import { likeController } from "./dependencies"
import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 



export const likeRouter = express.Router();
likeRouter.use(authMiddleware);

likeRouter.post(
    "/add",
    likeController.addLike.bind(likeController)
);

likeRouter.delete(
    "/remove",
    likeController.removeLike.bind(likeController)
);

likeRouter.get(
    "/count/:publicationId",
    likeController.countLikesByPublication.bind(likeController)
);