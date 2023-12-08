import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { RabbitMQService } from "./services/rabbit";
import { Validator } from "../domain/validations/validateData";

export class AddBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository, readonly rabbit: RabbitMQService) { }
    async run(userId: number, balance: number, description: string, categoryId: number): Promise<Account | Error> {
        try {
            await this.rabbit.connect();
            const addBalance = await this.accountRepository.addBalance(userId, balance, "", 0);
            if (addBalance instanceof Error) {
                return new Error('No se pudo agregar balance la cuenta');
            }
            let orderValidate = new Validator<Account>(addBalance);
            await orderValidate.invalidIfHasErrors();
            const data = {
                id: addBalance.id,
                balance: balance,
                type: true,
                description: description,
                categoryId: categoryId
            };

            await this.rabbit.publishMessage('orders-exchange', 'order.paid', { data });

            return addBalance;
        } catch (error: any) {
            return new Error('Error al agregar balance: ' + error.message);
        }
    }
}