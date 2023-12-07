import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { Validator } from "../domain/validations/validateData";

export class CreateAccountUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number): Promise<Account> {
        try {
            
            const createdAccount = await this.accountRepository.createAccount(userId);

            let orderValidate = new Validator<Account>(createdAccount);
            await orderValidate.invalidIfHasErrors();
            return createdAccount;
        } catch (Error: any) {
            throw new Error('Error al crear la cuenta: ' + Error.message);
        }
    }
}