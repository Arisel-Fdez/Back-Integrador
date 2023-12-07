import express from "express";
import {
    createTransactionController,
    getTransactionController,
    getAllTransacitionsController
} from "./dependencies";
import { authMiddleware } from "../../../auth/middlewares/authMiddleware"; 

export const transactionRouter = express.Router();
transactionRouter.use(authMiddleware);

transactionRouter.get(
    "/get/:id/:accountId",
    getTransactionController.run.bind(getTransactionController)
);

transactionRouter.post(
    "/create",
    createTransactionController.run.bind(createTransactionController)
);

transactionRouter.get(
    "/list/all/:accountId",
    getAllTransacitionsController.run.bind(getAllTransacitionsController)
);

