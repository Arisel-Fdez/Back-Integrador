import { AuthRepository } from '../domain/authRepository';
import { PgsqlAuthRepository } from './pgsqlAuthRepository';

export const authRepository: AuthRepository = new PgsqlAuthRepository();