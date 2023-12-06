import { LikeController } from "../infraestructure/controller/likeController";
import { PgsqlLikeRepository } from "../infraestructure/pgsqlLikeRepository";
import { LikeUseCase } from "../application/likeUseCase";


export const pgsqlLikeRepository = new PgsqlLikeRepository();
export const likeUseCase = new LikeUseCase(pgsqlLikeRepository);
export const likeController = new LikeController(likeUseCase);