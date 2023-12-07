import { PgsqlUserPublicationRepository } from "./pgsqlUserPublicationRepository";

import { UserPublicationUseCase } from "../application/userPublicationUserCase";
import { ViewPublicationsUseCase } from "../application/viewPublicationUseCase";
import { DeletePublicationUseCase } from "../application/deletePublicationUseCase";
import { UserPublicationController } from "./controller/userPublicationController";
import { ViewPublicationsController } from "./controller/ViewPublicationsController"; 
import { DeletePublicationController } from "./controller/DeletePublicationController"; 
import { ViewImagesController } from "./controller/viewImagesController";
import { ViewImagesUseCase } from "../application/viewImagesUseCase";
import { ViewAudiosController } from "./controller/viewAudioController";
import { ViewAudiosUseCase } from "../application/viewAudioUseCase";
import { ViewGifsController } from "./controller/viewGifsController";
import { ViewGifsUseCase } from "../application/viewGifsUseCase";
import { ViewPDFController } from "./controller/viewPDFsController";
import { ViewPDFUseCase } from "../application/viewPDFsUseCase";
import { ViewVideosController } from "./controller/viewVideosController";
import { ViewVideosUseCase } from "../application/viewVideosUseCase";
import { GetUserPublicationsUseCase } from "../application/getUserPublicationsUseCase";
import { GetUserPublicationsController } from "./controller/getUserPublicationsController";

export const pgsqlUsersRepository = new PgsqlUserPublicationRepository();

export const userPublicationUseCase = new UserPublicationUseCase(pgsqlUsersRepository);
export const viewPublicationsUseCase = new ViewPublicationsUseCase(pgsqlUsersRepository);
export const deletePublicationUseCase = new DeletePublicationUseCase(pgsqlUsersRepository);

export const userPublicationController = new UserPublicationController(userPublicationUseCase);
export const viewPublicationsController = new ViewPublicationsController(viewPublicationsUseCase);
export const deletePublicationController = new DeletePublicationController(deletePublicationUseCase);

export const getUserPublicationsUseCase = new GetUserPublicationsUseCase(pgsqlUsersRepository);
export const getUserPublicationsController  = new GetUserPublicationsController(getUserPublicationsUseCase);



export const viewImagesUseCase = new ViewImagesUseCase(pgsqlUsersRepository); 
export const viewImagesController = new ViewImagesController(viewImagesUseCase);

export const viewAudiosUseCase = new ViewAudiosUseCase(pgsqlUsersRepository);
export const viewAudioController = new ViewAudiosController(viewAudiosUseCase);

export const viewGifsUseCase = new ViewGifsUseCase(pgsqlUsersRepository);
export const viewGifsController = new ViewGifsController(viewGifsUseCase);

export const viewPDFsUseCase = new ViewPDFUseCase(pgsqlUsersRepository);
export const viewPDFsController = new ViewPDFController(viewPDFsUseCase);

export const viewVideosUseCase = new ViewVideosUseCase(pgsqlUsersRepository);
export const viewVideosController = new ViewVideosController(viewVideosUseCase);