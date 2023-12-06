import express from "express";
import {
    createTransactionController,
    getTransactionController,
    getAllTransacitionsController
} from "./dependencies";

export const transactionRouter = express.Router();

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

