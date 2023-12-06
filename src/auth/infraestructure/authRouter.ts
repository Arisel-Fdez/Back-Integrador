import express from 'express';
import { AuthController } from './controller/authController';
import { AuthUseCase } from '../application/authUseCase';
import { PgsqlAuthRepository } from './pgsqlAuthRepository';

const authRepository = new PgsqlAuthRepository();
const authUseCase = new AuthUseCase(authRepository);
const authController = new AuthController(authUseCase);

const authRouter = express.Router();

authRouter.post('/login', authController.run.bind(authController));

export { authRouter };