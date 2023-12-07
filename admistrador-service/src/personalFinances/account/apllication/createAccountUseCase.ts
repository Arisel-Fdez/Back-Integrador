import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";

export class CreateAccountUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number): Promise<Account | Error> {
        try {
            if (!userId) {
                return new Error('No se pudo crear la cuenta');
            }
            const createdAccount = await this.accountRepository.createAccount(userId);
            if (createdAccount === null) {
                return new Error('No se pudo crear la cuenta');
            }
            return createdAccount;
        } catch (Error: any) {
            return new Error('Error al crear la cuenta: ' + Error.message);
        }
    }
}