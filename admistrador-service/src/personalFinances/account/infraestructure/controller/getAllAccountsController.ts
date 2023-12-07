import { Request, Response } from "express";
import { GetAllAccountsUseCase } from "../../apllication/getAllAccountsUseCase";

export class GetAllAccountsController {
    constructor(private readonly getAllAccountsUseCase: GetAllAccountsUseCase) { }

    async run(req: Request, res: Response) {
        try {

            const result = await this.getAllAccountsUseCase.run();
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
