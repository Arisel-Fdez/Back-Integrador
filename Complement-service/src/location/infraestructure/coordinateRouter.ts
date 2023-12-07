import express from "express";
import { coordinateController, getCoordinatesByUserIdController } from "./dependecies";


export const coordinateRouter = express.Router();

coordinateRouter.post(
    "/coordinate", 
    coordinateController.run.bind(coordinateController)
);


coordinateRouter.get(
    "/user/:userId/coordinates", 
    getCoordinatesByUserIdController.run.bind(getCoordinatesByUserIdController)
);