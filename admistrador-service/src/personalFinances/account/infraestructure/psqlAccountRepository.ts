import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import AccountModel from "./models/accountModel";
import UserModel from "./models/userModel";

export class PgsqlAccountRepository implements AccountRepository {
    async deleteAccount(userId: number): Promise<String> {
        try {
            const deleteAccount = await AccountModel.destroy({ where: { userId } })
            return "success"
        } catch (error) {
            throw new Error('Error en la transacción:' + error);

        }
    }
    async getAllAccounts(): Promise< Account[]> {
        try {
            const accounts = await AccountModel.findAll();

            if (accounts.length === 0) {
                throw new Error('No se encontraron transacciones para la cuenta');
            }

            return accounts.map(account => new Account(
                account.id,
                account.userId,
                account.balance,
            ));
        } catch (error) {
            throw new Error('Error en la transacción:' + error);

        }
    }

    async createAccount(userId: number): Promise<Account> {
        try {
            console.log('ss')
            const userModel = await UserModel.create({ userId });
            const createdAccount = await AccountModel.create({ userId });
            const account = new Account(createdAccount.id, createdAccount.balance, createdAccount.userId);
            return account
        } catch (error) {
            throw new Error('Error en la transacción:' + error);
        }
    }

    async getAccountBalance(id: number, userId: number): Promise<Account> {
        try {
            const account = await AccountModel.findOne({ where: { id, userId } });
            if (!account) {
                throw new Error('Error en la transacción:');
            }
            const result = new Account(account.id, account.userId, account.balance);
            return result;
        } catch (error: any) {
            throw new Error('Error en la transacción:' + error.message);
        }
    }

    async addBalance(userId: number, balance: number): Promise<Account> {
        try {
            const account = await AccountModel.findOne({ where: { userId } });
            if (!account) {
                throw new Error('Cuenta no encontrada');
            }
            const oldBalance = account.balance;
            const newBalance = oldBalance + balance;
            account.balance = newBalance;
            await account.save();
            return new Account(account.id, account.userId, account.balance);
        } catch (error: any) {
            throw new Error('Error en la transacción:' + error.message);

        }
    }

    async reduceBalance(userId: number, balance: number): Promise<Account> {
        try {
            const account = await AccountModel.findOne({ where: { userId } });
            console.log('account', account)
            if (!account) {
                console.log('first')
                throw new Error('Cuenta no encontrada');
            }

            if (account.balance < balance) {
                console.log('first2')
                throw new Error('Saldo insuficiente');
            }
            const oldBalance = account.balance;
            const newBalance = oldBalance - balance;
            account.balance = newBalance;
            await account.save();

            return new Account(account.id, account.userId, account.balance);
        } catch (error:any) {
            throw new Error('Error en la transacción:' + error.message);
        }
    }

}
