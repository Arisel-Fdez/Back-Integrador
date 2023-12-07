import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import UserModel from "./models/userModel";

export class PgsqlUserRepository implements UserRepository {

    async addUser(name: string, last_name: string, email: string, password: string, profilePicture: string): Promise<User | null> {
        try {
            const createdUser = await UserModel.create({ name, last_name, email, password, profilePicture });

            return new User(createdUser.id, createdUser.name, createdUser.last_name, createdUser.email, createdUser.password, createdUser.profilePicture);
        } catch (error) {
            console.error("Error in PgsqlUserRepository:", error);
            return null;
        }
    }

    async getAllUser(): Promise<User[]> {
        try {
            const users = await UserModel.findAll();
            return users.map(user => new User(user.id, user.name, user.last_name, user.email, user.password, user.profilePicture));
        } catch (error) {
            console.error("Error in PgsqlUserRepository:", error);
            return [];
        }
    }

    async deleteUserById(id: number): Promise<boolean> {
        try {
            const result = await UserModel.destroy({ where: { id } });
            return result > 0; // Retorna true si se eliminó al menos un registro.
        } catch (error) {
            console.error("Error in PgsqlUsersRepository:", error);
            return false;
        }
    }


}
