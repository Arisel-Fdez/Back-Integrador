import { IsNotEmpty, IsNumber } from "class-validator";
import { ValidatableEntity } from "./validations/validatable";

export class Account implements ValidatableEntity {
    
    public id: number;

    @IsNotEmpty()
    @IsNumber()
    public userId: number;

    @IsNotEmpty()
    @IsNumber()
    public balance: number;

    constructor(id: number, userId: number, balance: number) {
        this.id = id;
        this.userId = userId;
        this.balance = balance;
    }

    async validate() {
        return Promise.resolve();
    }
}
