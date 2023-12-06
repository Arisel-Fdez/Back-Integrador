import express from "express";
import { addUsersController, listAllUsersController, deleteUserController } from "./dependencies";
//import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 

export const userRouter = express.Router();

userRouter.post(
    "/create",
    addUsersController.run.bind(addUsersController)
);

userRouter.get(
    "/",
    listAllUsersController.run.bind(listAllUsersController)
);

userRouter.delete(
    "/delete/:id",
    deleteUserController.run.bind(deleteUserController)
);

