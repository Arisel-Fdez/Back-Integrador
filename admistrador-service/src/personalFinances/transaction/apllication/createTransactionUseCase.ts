import signale from 'signale';
import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';
import { Validator } from "../domain/validations/validateData";

export class CreateTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) { }
  
    async run(
      date: Date,
      type: boolean,
      amount: number,
      description: string,
      categoriId: number,
      accountId: number
    ): Promise<Transaction> {
      try {
        console.log('first', date, type, amount, description, categoriId, accountId);
  
        const createdTransaction = await this.transactionRepository.createTransaction(
          date,
          type,
          amount,
          description,
          categoriId,
          accountId
        );
        let orderValidate = new Validator<Transaction>(createdTransaction);
        await orderValidate.invalidIfHasErrors();

        return createdTransaction;
      } catch (error: any) {
        throw new Error('Error al crear la transacción: ' + error.message);
      }
    }
}
