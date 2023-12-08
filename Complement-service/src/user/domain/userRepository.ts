import { User } from "./user";

export interface UserRepository {
    addUser(name: string, last_name: string, email: string, password: string, profilePicture?: string): Promise<User | null>;
    getAllUser(): Promise<User[]>;
    emailExists(email: string): Promise<boolean>;
    deleteUserById(id: number): Promise<boolean>;
    updateProfilePicture(userId: string, profilePicture: string): Promise<boolean>; 
}
