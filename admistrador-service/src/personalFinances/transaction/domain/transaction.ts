import { IsNotEmpty, IsNumber, IsBoolean, IsDate, IsString } from "class-validator";
import { ValidatableEntity } from "./validations/validatable";

export class Transaction implements ValidatableEntity {
    public id: number;

    @IsNotEmpty()
    @IsDate()
    public date: Date;

    @IsNotEmpty()
    @IsBoolean()
    public type: boolean;

    @IsNotEmpty()
    @IsNumber()
    public amount: number;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsNumber()
    public categoriId: number;

    @IsNotEmpty()
    @IsNumber()
    public accountId: number;

    constructor(id: number, date: Date, type: boolean, amount: number, description: string, categoriId: number, accountId: number,) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.categoriId = categoriId;
        this.accountId = accountId;
    }

    async validate() {
        return Promise.resolve();
    }
}
