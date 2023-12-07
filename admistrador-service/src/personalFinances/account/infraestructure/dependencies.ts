import { PgsqlAccountRepository } from "./psqlAccountRepository";

import { AddBalanceUseCase } from "../apllication/addBalanceUseCase";
import { AddBalanceController } from "./controller/addBalanceController";

import { CreateAccountUseCase } from "../apllication/createAccountUseCase";
import { CreateAccountController } from "./controller/createAccountController";

import { GetAccountBalanceUseCase } from "../apllication/getAccountBalanceUseCase";
import { GetAccountBalanceController } from "./controller/getAccountBalanceController";

import { ReduceBalanceUseCase } from "../apllication/reduceBalanceUseCase";
import { ReduceBalanceController } from "./controller/reduceBalanceController";

import { GetAllAccountsUseCase } from "../apllication/getAllAccountsUseCase";
import { GetAllAccountsController } from "./controller/getAllAccountsController";

import { DeleteAccountUseCase } from "../apllication/deleteAccountUseCase";
import { DeleteAccountController } from "./controller/deleteAccountController";
import { RabbitMQ } from "./services/rabbit";
import { startAccountConsumer } from "./services/createAccountConsume";

const rabbitMQ = new RabbitMQ();
const pgsqlUsersRepository = new PgsqlAccountRepository();

export async function createAccountServices() {
    const createAccountUseCase = new CreateAccountUseCase(pgsqlUsersRepository);
    await startAccountConsumer(createAccountUseCase);    
}

const addBalanceUseCase = new AddBalanceUseCase(pgsqlUsersRepository, rabbitMQ);
export const addBalanceController = new AddBalanceController(addBalanceUseCase);

const getAccountBalanceUseCase = new GetAccountBalanceUseCase(pgsqlUsersRepository);
export const getAccountBalanceController = new GetAccountBalanceController(getAccountBalanceUseCase);

const reduceBalanceUseCase = new ReduceBalanceUseCase(pgsqlUsersRepository, rabbitMQ);
export const reduceBalanceController = new ReduceBalanceController(reduceBalanceUseCase);

const getAllAccountsUseCase = new GetAllAccountsUseCase(pgsqlUsersRepository);
export const getAllAccountsController = new GetAllAccountsController(getAllAccountsUseCase);

const deleteAccountUseCase = new DeleteAccountUseCase(pgsqlUsersRepository);
export const deleteAccountController = new DeleteAccountController(deleteAccountUseCase);