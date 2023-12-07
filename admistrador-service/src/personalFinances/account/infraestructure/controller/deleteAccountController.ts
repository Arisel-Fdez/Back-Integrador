import { Request, Response } from "express";
import { DeleteAccountUseCase } from "../../apllication/deleteAccountUseCase";

export class DeleteAccountController {
    constructor(private readonly deleteAccountUseCase: DeleteAccountUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { userId } = req.params;

            const result = await this.deleteAccountUseCase.run(parseInt(userId));

            if (result instanceof Error) {
                return res.status(404).send({
                    status: "error",
                    message: "Error al encontrar la cuenta asociada",
                });
            }
            return res.status(200).send({
                status: "success",
                data: result,
                message: "Cuenta eliminada con éxito",
            });
            
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al realizar la transacción",
            });
        }
    }
}
