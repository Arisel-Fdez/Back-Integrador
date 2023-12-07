import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { RabbitMQService } from "./services/rabbit";

export class AddBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository, readonly rabbit: RabbitMQService) { }
    async run(userId: number, balance: number, description: string, categoryId: number): Promise<Account | Error | String> {
        try {
            if (!userId || !balance || balance < 1 || !description || !categoryId) {
                return new Error('Se deben rellenar todos los campos');
            }

            await this.rabbit.connect();
            const addBalance = await this.accountRepository.addBalance(userId, balance, "", 0);
            if (addBalance instanceof Error || addBalance === null) {
                return new Error('No se pudo agregar balance la cuenta');
            }

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