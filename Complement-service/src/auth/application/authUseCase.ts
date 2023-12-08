// AuthUseCase.ts
import { generateToken } from '../utils/jwt';
import { AuthRepository } from '../domain/authRepository';
import { AuthValidation } from '../domain/validation/authValidation'; // Asegúrate de que la ruta de importación sea correcta
import { validate } from 'class-validator';

type AuthResponse = { 
    status: 'success' | 'error', 
    token?: string,
    userId?: number,
    message?: string 
};

export class AuthUseCase {
    constructor(private authRepository: AuthRepository) {}

    async run(email: string, password: string): Promise<AuthResponse> {
        const authValidation = new AuthValidation(email, password);

        const errors = await validate(authValidation);
        if (errors.length > 0) {
            console.error("Errores de validación:", errors);
            return {
                status: 'error',
                message: 'Datos de entrada inválidos'
            };
        }

        const user = await this.authRepository.verifyUser(email, password);
        if (user) {
            const token = generateToken({ email: user.email, userId: user.id });
            return {
                status: 'success',
                token,
                userId: user.id
            };
        } else {
            return {
                status: 'error',
                message: 'Credenciales inválidas'
            };
        }
    }
}
