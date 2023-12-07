import { Request, Response } from "express";
import { GetAllTransacitionsUseCase } from "../../apllication/getAllTransacitionsUseCase";

export class GetAllTransacitionsController {
    constructor(private readonly getAllTransacitionsUseCase: GetAllTransacitionsUseCase) { }

    async run(req: Request, res: Response) {
        try {
            let { accountId } = req.params;

            const result = await this.getAllTransacitionsUseCase.run(parseInt(accountId));
            if (result instanceof Error) {
                return res.status(404).send({
                    status: "error",
                    message: "Error al encontrar la cuenta asociada",
                });
            }

            return res.status(200).send({
                status: "success",
                data: result,
                message: "elementos recuperados con exito actualizado con éxito",
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al realizar la transacción",
            });
        }
    }
}
