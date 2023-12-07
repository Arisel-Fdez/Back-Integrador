import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { RabbitMQService } from "./services/rabbit";
import { Validator } from "../domain/validations/validateData";

export class ReduceBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository, readonly rabbit: RabbitMQService) { }
    async run(userId: number, balance: number, description: string,categoryId: number): Promise<Account> {
        try {

            await this.rabbit.connect();
            const reduceBalance = await this.accountRepository.reduceBalance(userId, balance, "", 0);

            let orderValidate = new Validator<Account>(reduceBalance);
            await orderValidate.invalidIfHasErrors();

            const data = {
                id: reduceBalance.id,
                balance: balance,
                type: false,
                description: description,
                categoryId: categoryId
            };
            await this.rabbit.publishMessage('orders-exchange', 'order.paid', { data });

            return reduceBalance;
        } catch (error: any) {
            throw new Error('Error al recuperar balance: ' + error.message);
        }
    }
}