import { Account } from '../domain/account';
import { AccountRepository } from '../domain/accountRepository';
import { Validator } from "../domain/validations/validateData";

export class GetAllAccountsUseCase {

    constructor(private readonly AccountRepository: AccountRepository) { }

    async run(
    ): Promise<Account[]> {
        try {

            const transaccion = await this.AccountRepository.getAllAccounts();
            
            return transaccion;
        } catch (Error: any) {
            throw new Error('Error al listar las transacciones: ' + Error.message);
        }
    }
}