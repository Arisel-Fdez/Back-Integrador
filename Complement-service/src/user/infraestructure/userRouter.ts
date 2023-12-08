import express from "express";
import { addUsersController, listAllUsersController, deleteUserController, uploadProfilePictureController } from "./dependencies";
//import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 

export const userRouter = express.Router();

userRouter.post(
    "/create",
    addUsersController.run.bind(addUsersController)
);
userRouter.post("/profile",uploadProfilePictureController.run.bind(uploadProfilePictureController));

userRouter.get(
    "/",
    listAllUsersController.run.bind(listAllUsersController)
);

userRouter.delete(
    "/delete/:id",
    deleteUserController.run.bind(deleteUserController)
);

