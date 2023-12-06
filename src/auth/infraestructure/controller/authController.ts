import { Request, Response } from 'express';
import { AuthUseCase } from '../../application/authUseCase';

export class AuthController {
    constructor(private authUseCase: AuthUseCase) {}

    async run(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await this.authUseCase.run(email, password);
        
        if (result.status === 'success' && result.token) {
            res.status(200).send({ status: 'success', token: result.token, userId: result.userId });
        } else {
            res.status(401).send(result);
        }
    }
}
