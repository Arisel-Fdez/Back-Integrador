import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { Validator } from "../domain/validations/validateData";

export class CreateAccountUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number): Promise<Account | Error> {
        try {
            const createdAccount = await this.accountRepository.createAccount(userId);
            if (createdAccount instanceof Error) {
                return new Error('No se pudo crear la cuenta'+ Error);
            }
            let orderValidate = new Validator<Account>(createdAccount);
            await orderValidate.invalidIfHasErrors();
            return createdAccount;
        } catch (Error: any) {
            return new Error('Error al crear la cuenta: ' + Error.message);
        }
    }
}