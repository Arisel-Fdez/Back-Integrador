import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';
export class GetAllTransacitionsUseCase {

    constructor(private readonly transactionRepository: TransactionRepository) { }

    async run(
        accountId: number,
    ): Promise<Transaction[] | Error | string> {
        try {
            if (!accountId) {
                return new Error('No se pudo recuperar ninguna informacion');
            }
            const transaccion = await this.transactionRepository.getAllTransactions(accountId);
            return transaccion;
        } catch (Error: any) {
            return new Error('Error al listar las transacciones: ' + Error.message);
        }
    }
}