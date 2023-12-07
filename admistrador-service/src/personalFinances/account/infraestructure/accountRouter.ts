import express from "express";
import {
    addBalanceController,
    getAccountBalanceController,
    reduceBalanceController,
    getAllAccountsController,
    deleteAccountController
} from "./dependencies";
import { authMiddleware } from "../../../auth/middlewares/authMiddleware";

export const accountRouter = express.Router();
accountRouter.use(authMiddleware);

accountRouter.put(
    "/balance/add/:userId",
    addBalanceController.run.bind(addBalanceController)
);

accountRouter.get(
    "/get/balance/:id/:userId",
    getAccountBalanceController.run.bind(getAccountBalanceController)
);

accountRouter.put(
    "/balance/reduce/:userId",
    reduceBalanceController.run.bind(reduceBalanceController)
);

accountRouter.get(
    "/list/all",
    getAllAccountsController.run.bind(getAllAccountsController)
);

accountRouter.delete(
    "/delete/:userId",
    deleteAccountController.run.bind(deleteAccountController)
);