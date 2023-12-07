import { Transaction } from "./transaction";

export interface TransactionRepository {
    createTransaction(
        date: Date, 
        type: boolean,
        amount: number, 
        description: string, 
        categoriId: number, 
        accountId: number
        ): Promise<Transaction >;

    getTransaction(id: number, accountId:number): Promise<Transaction>;
    
    delTransaction(id: string): Promise<string>;

    getAllTransactions(accountId: number): Promise<Transaction[]>
}
