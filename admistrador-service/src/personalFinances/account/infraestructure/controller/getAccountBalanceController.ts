import { Request, Response } from "express";
import { GetAccountBalanceUseCase } from "../../apllication/getAccountBalanceUseCase";

export class GetAccountBalanceController {
    constructor(private readonly getAccountBalanceUseCase: GetAccountBalanceUseCase) { }

    async run(req: Request, res: Response) {
        try {
            let { id, userId } = req.params;

            const result = await this.getAccountBalanceUseCase.run(parseInt(id), userId);

            if (result instanceof Error||!result) {
                return res.status(404).send({
                    status: "error",
                    message: result.message,
                });
            }

            return res.status(200).send({
                status: "success",
                data: result,
                message: "Balance actualizado con éxito",
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al realizar la transacción",
            });
        }
    }
}
