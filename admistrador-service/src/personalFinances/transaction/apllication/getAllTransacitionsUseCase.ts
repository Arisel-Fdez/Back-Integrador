import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';
import { Validator } from "../domain/validations/validateData";

export class GetAllTransacitionsUseCase {

    constructor(private readonly transactionRepository: TransactionRepository) { }

    async run(
        accountId: number,
    ): Promise<Transaction[]> {
        try {

            const transaccion = await this.transactionRepository.getAllTransactions(accountId);
            
            return transaccion;
        } catch (Error: any) {
            return new Error('Error al listar las transacciones: ' + Error.message);
        }
    }
}