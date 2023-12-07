import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';

export class GetTransactionUseCase {

    constructor(private readonly transactionRepository: TransactionRepository) { }

    async run(
        id: number,
        accountId: number 
    ): Promise<Transaction | Error | string> {
        try {
            if (!id || !accountId) {
                return new Error('No se pudo recuperar ninguna informacion');
            }

            const transaccion = await this.transactionRepository.getTransaction(id, accountId);
            return transaccion;
        } catch (Error: any) {
            return new Error('Error al listar las transacciones: ' + Error.message);
        }
    }
}
