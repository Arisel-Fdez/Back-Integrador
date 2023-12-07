import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { RabbitMQService } from "./services/rabbit";

export class ReduceBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository, readonly rabbit: RabbitMQService) { }
    async run(userId: number, balance: number, description: string,categoryId: number): Promise<Account | Error | String> {
        try {
            if (!userId || !balance || balance < 1 || !description || !categoryId) {
                return new Error('Se deben rellenar todos los campos');
            }

            await this.rabbit.connect();
            const reduceBalance = await this.accountRepository.reduceBalance(userId, balance, "", 0);
            if (reduceBalance instanceof Error || reduceBalance === null) {
                return new Error('No se pudo agregar balance la cuenta');
            }

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
            return new Error('Error al recuperar balance: ' + error.message);
        }
    }
}