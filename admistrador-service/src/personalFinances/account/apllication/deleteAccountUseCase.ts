import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";

export class DeleteAccountUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number): Promise<String> {
        try {
            const deleteAccount = await this.accountRepository.deleteAccount(userId); 
            return deleteAccount;
        } catch (error: any) {
            throw new Error('Error al eliminar: ' + error.message);
        }
    }
}