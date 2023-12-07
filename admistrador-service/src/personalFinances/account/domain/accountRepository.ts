import { Account } from "./account";

export interface AccountRepository {
    createAccount(
        userId: number,
        ): Promise<Account | Error>; //post

    getAccountBalance(id: number, userId: number): Promise<Account | Error>; //get

    addBalance(userId: number, balance: number, description: string, categoriId: number): Promise<Account | null | Error>; //put

    reduceBalance(userId: number, balance: number, description: string, categoriId: number): Promise<Account | null | Error>; //put

    getAllAccounts(): Promise<Account[] | Error | string>

    deleteAccount( userId: number): Promise<String | Error>;
}
