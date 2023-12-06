import { PgsqlCoordinateRepository } from "./PgsqlCoordinateRepository";

import { AddCoordinateUseCase } from "../application/addCoordinateUseCase";
import { CoordinateController } from "./controller/coordinateController";

import { GetCoordinatesByUserIdUseCase } from "../application/getCoordinatesByUserIdUseCase ";
import { GetCoordinatesByUserIdController } from "./controller/getCoordinatesByUserIdController";

export const pgsqlCoordinateRepository = new PgsqlCoordinateRepository();

export const addCoordinateUseCase = new AddCoordinateUseCase(pgsqlCoordinateRepository);
export const coordinateController = new CoordinateController(addCoordinateUseCase);

export const getCoordinatesByUserIdUseCase = new GetCoordinatesByUserIdUseCase(pgsqlCoordinateRepository);
export const getCoordinatesByUserIdController = new GetCoordinatesByUserIdController(getCoordinatesByUserIdUseCase);