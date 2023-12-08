import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class UserIdValidation {
    @IsNotEmpty({ message: 'El ID es obligatorio' })
    @IsInt({ message: 'El ID debe ser un número entero' })
    @Min(1, { message: 'El ID debe ser un número positivo' })
    public id: number;

    constructor(id: number) {
        this.id = id;
    }
}
