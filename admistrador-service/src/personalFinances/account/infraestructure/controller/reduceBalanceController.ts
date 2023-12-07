import { Request, Response } from "express";
import { ReduceBalanceUseCase } from "../../apllication/reduceBalanceUseCase";

export class ReduceBalanceController {
    constructor(private readonly reduceBalanceUseCase: ReduceBalanceUseCase) { }

    async run(req: Request, res: Response) {
        try {
            let { userId } = req.params;
            let { balance, description,categoryId} = req.body;

            const result = await this.reduceBalanceUseCase.run(parseInt(userId), balance, description, categoryId);
            if (result instanceof Error||!result) {
                return res.status(404).send({
                    status: "error",
                    message: result.message,
                });
            }
            return res.status(200).send({
                status: "success",
                data: result,
                message: "Balance actualizado con exito",
            });
        } catch (Error) {
            return res.status(500).send({
                status: "error",
                message: "Error al realizar la transaccion",
            });
        }
    }
}