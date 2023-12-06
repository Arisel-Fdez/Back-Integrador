import signale from 'signale';
import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';

export class CreateTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) { }
  
    async run(
      date: Date,
      type: boolean,
      amount: number,
      description: string,
      categoriId: number,
      accountId: number
    ): Promise<Transaction | Error | string> {
      try {
        console.log('first', date, type, amount, description, categoriId, accountId);
  
        if (!date || type === null || !amount || !description || !categoriId || !accountId) {
          console.log('alv todo')
          return new Error('Falta indormacion');
        }
  
        const createTransaction = await this.transactionRepository.createTransaction(
          date,
          type,
          amount,
          description,
          categoriId,
          accountId
        );
  console.log('createTransaction', createTransaction)
        if (createTransaction instanceof Error) {
          return new Error('No se pudo encontrar la transaccion');
        }
  
        return createTransaction;
      } catch (error: any) {
        return new Error('Error al encontrar la transaccion: ' + error.message);
      }
    }
  }