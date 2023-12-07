import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';
import { Validator } from "../domain/validations/validateData";

export class GetTransactionUseCase {

    constructor(private readonly transactionRepository: TransactionRepository) { }

    async run(
        id: number,
        accountId: number 
    ): Promise<Transaction> {
        try {

            const transaccion = await this.transactionRepository.getTransaction(id, accountId);

            let orderValidate = new Validator<Transaction>(transaccion);
            await orderValidate.invalidIfHasErrors();

            return transaccion;
        } catch (Error: any) {
            return new Error('Error al listar las transacciones: ' + Error.message);
        }
    }
}
