import { Request, Response } from "express";
import { CreateTransactionUseCase } from "../../apllication/createTransactionUseCase";

export class CreateTransactionController {
    constructor(private readonly CreateTransactionUseCase: CreateTransactionUseCase) { }

    async run(req: Request, res: Response) {
        try {
            let { date, type, amount, description, categoriId, accountId } = req.body;

            const result = await this.CreateTransactionUseCase.run(date, type, amount, description, categoriId, accountId);
            console.log('first', date, type, amount, description, categoriId, accountId)
            console.log('result', result)
            if (result instanceof Error) {
                return res.status(404).send({
                    status: "error",
                    message: result.message,
                });
            }

            return res.status(200).send({
                status: "success",
                data: result,
                message: "Transaccion creada con éxito",
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al realizar la transacción",
            });
        }
    }
}