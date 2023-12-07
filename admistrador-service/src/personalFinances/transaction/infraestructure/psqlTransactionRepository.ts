import { where } from "sequelize";
import { Transaction } from "../domain/transaction";
import { TransactionRepository } from "../domain/transactionRepository";
import TransactionModel from "./models/transactionModel";


export class PgsqlTransactionRepository implements TransactionRepository {
    async createTransaction(date: Date, type: boolean, amount: number, description: string, categoriId: number, accountId: number): Promise<Transaction> {
        try {
            const createdTransaction = await TransactionModel.create({ date, type, amount, description, categoriId, accountId });
            
            return new Transaction(createdTransaction.id, createdTransaction.date, createdTransaction.type, createdTransaction.amount, createdTransaction.description, createdTransaction.categoriId, createdTransaction.accountId);
        } catch (error) {
            throw new Error('Error en la transacción:' + error);
        }
    }

    async getTransaction(id: number, accountId: number): Promise<Transaction> {
        try {
            const transaction = await TransactionModel.findOne({ where: { id, accountId } });
            console.log('transaction', transaction)
            if (!transaction) {
                throw new Error('Cuenta no encontrada');
            }
            return new Transaction(transaction.id, transaction.date, transaction.type, transaction.amount, transaction.description, transaction.categoriId, transaction.accountId);
        } catch (error: any) {
            throw new Error('Error en la transacción:' + error.message);
        }
    }

    delTransaction(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async getAllTransactions(accountId: number): Promise<Transaction[]> {
        try {
            const transactions = await TransactionModel.findAll({ where: { accountId } });
            
            if (transactions.length === 0) {
                throw new Error('No se encontraron transacciones para la cuenta');
            }
    
            return transactions.map(transaction => new Transaction(
                transaction.id,
                transaction.date,
                transaction.type,
                transaction.amount,
                transaction.description,
                transaction.categoriId,
                transaction.accountId
            ));
        } catch (error) {
            throw new Error('Error en la transacción:'+ error);
        }
    }


}
