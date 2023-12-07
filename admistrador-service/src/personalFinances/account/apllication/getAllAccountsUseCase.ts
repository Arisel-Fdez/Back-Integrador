import { Account } from '../domain/account';
import { AccountRepository } from '../domain/accountRepository';

export class GetAllAccountsUseCase {

    constructor(private readonly AccountRepository: AccountRepository) { }

    async run(
    ): Promise<Account[] | Error | string> {
        try {

            const transaccion = await this.AccountRepository.getAllAccounts();
            return transaccion;
        } catch (Error: any) {
            return new Error('Error al listar las transacciones: ' + Error.message);
        }
    }
}