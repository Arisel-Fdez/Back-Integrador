import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { Validator } from "../domain/validations/validateData";

export class DeleteAccountUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number): Promise<Account | Error |String> {
        try {
            const deleteAccount = await this.accountRepository.deleteAccount(userId);
            if (deleteAccount instanceof Error) {
                return new Error('No se pudo eliminar cuenta');
            }
            return deleteAccount;
        } catch (error: any) {
            return new Error('Error al eliminar: ' + error.message);
        }
    }
}