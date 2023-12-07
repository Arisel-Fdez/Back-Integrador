import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { Validator } from "../domain/validations/validateData";

export class GetAccountBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(id: number, userId: string): Promise<Account> {
        try {

            const createdAccount = await this.accountRepository.getAccountBalance(id, parseInt(userId));
            let orderValidate = new Validator<Account>(createdAccount);
            await orderValidate.invalidIfHasErrors();
            return createdAccount;
        } catch (error: any) {
            throw new Error('Error al recuperar balance: ' + error.message);
        }
    }
}