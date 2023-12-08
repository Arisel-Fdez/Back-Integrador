import { PgsqlUserRepository } from "./pgsqlUserRepository";

import { AddUserUseCase } from "../application/addUserUseCase";
import { AddUsersController } from "./controller/addUserController";
import { ListAllUsersController } from "./controller/listAllUserController";
import { ListAllUserUseCase } from "../application/listAllUserUseCase";
import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { DeleteUserController } from "./controller/deleteUserController";
import { UploadProfilePictureController } from "./controller/uploadProfilePictureController";
import { UploadProfilePictureUseCase } from "../application/uploadProfilePictureUseCase";
import { RabbitMQ } from "./services/rabbit";


const rabbitMQ = new RabbitMQ();
export const pgsqlUsersRepository = new PgsqlUserRepository();

//nueva inportacion para usar con eventos
export const addUsersUseCase = new AddUserUseCase(pgsqlUsersRepository, rabbitMQ);
export const addUsersController = new AddUsersController(addUsersUseCase);

export const listAllUsersUseCase = new ListAllUserUseCase(pgsqlUsersRepository);
export const listAllUsersController = new ListAllUsersController(listAllUsersUseCase);

export const deletedUsersUseCase = new DeleteUserUseCase(pgsqlUsersRepository);
export const deleteUserController = new DeleteUserController(deletedUsersUseCase);

export const uploadProfilePictureUseCase = new UploadProfilePictureUseCase(pgsqlUsersRepository);
export const uploadProfilePictureController = new UploadProfilePictureController(uploadProfilePictureUseCase);