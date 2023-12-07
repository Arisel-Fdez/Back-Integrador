import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";

export class DeleteAccountUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number): Promise<Account | Error |String> {
        try {
            if (!userId) {
                return new Error('Se deben rellenar todos los campos');
            }

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