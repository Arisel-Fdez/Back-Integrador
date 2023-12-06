import { PgsqlTransactionRepository } from "./psqlTransactionRepository";
import { startOrderConsumer } from "./services/createTransactionConsume";

import { CreateTransactionUseCase } from "../apllication/createTransactionUseCase";
import { CreateTransactionController } from "./controller/createTransactionController";

import { GetTransactionUseCase } from "../apllication/getTransactionUseCase";
import { GetTransactionController } from "./controller/getTransactionController";

import { GetAllTransacitionsUseCase } from "../apllication/getAllTransacitionsUseCase";
import { GetAllTransacitionsController } from "./controller/getAllTransactionsController";

const pgsqlUsersRepository = new PgsqlTransactionRepository();

const createTransactionUseCase = new CreateTransactionUseCase(pgsqlUsersRepository);
export const createTransactionController = new CreateTransactionController(createTransactionUseCase);

const getTransactionUseCase = new GetTransactionUseCase(pgsqlUsersRepository);
export const getTransactionController = new GetTransactionController(getTransactionUseCase);

const getAllTransacitionsUseCase = new GetAllTransacitionsUseCase(pgsqlUsersRepository);
export const getAllTransacitionsController = new GetAllTransacitionsController(getAllTransacitionsUseCase);

export async function createTransactionServices() {
    const createTransactionUseCase = new CreateTransactionUseCase(pgsqlUsersRepository);
    await startOrderConsumer(createTransactionUseCase);    
}