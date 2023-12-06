import { Request, Response } from "express";
import { CreateAccountUseCase } from "../../apllication/createAccountUseCase";

export class CreateAccountController {
    constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { id } = req.body;

            const result = await this.createAccountUseCase.run(id);

            if (result instanceof Error) {
                return res.status(200).send({
                    status: "success",
                    data: result,
                    message: "Balance actualizado con éxito",
                });
            }

            return res.status(404).send({
                status: "error",
                message: "Error al encontrar la cuenta asociada",
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al realizar la transacción",
            });
        }
    }
}
