import { Account } from "./account";

export interface AccountRepository {
    createAccount(
        userId: number,
        ): Promise<Account>; //post

    getAccountBalance(id: number, userId: number): Promise<Account>; //get

    addBalance(userId: number, balance: number, description: string, categoriId: number): Promise<Account>; //put

    reduceBalance(userId: number, balance: number, description: string, categoriId: number): Promise<Account>; //put

    getAllAccounts(): Promise<Account[]>

    deleteAccount( userId: number): Promise<String >;
}
