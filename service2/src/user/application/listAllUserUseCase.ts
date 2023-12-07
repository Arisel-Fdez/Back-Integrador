
import { UserRepository } from "../domain/userRepository";
import { User } from "../domain/user";

export class ListAllUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async run(): Promise<User[]> {
        return this.userRepository.getAllUser();
    }
}