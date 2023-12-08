import { IsNotEmpty, IsString, IsUrl, IsInt, Min } from 'class-validator';

export class UserPublicationValidation {
    @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
    @IsInt({ message: 'El ID de usuario debe ser un número entero' })
    @Min(1, { message: 'El ID de usuario debe ser un número positivo' })
    public userId: number;

    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
    public description: string;

    @IsNotEmpty({ message: 'El enlace multimedia es obligatorio' })
    @IsUrl({}, { message: 'El enlace multimedia debe ser una URL válida' })
    public multimedia: string;

    constructor(userId: number, description: string, multimedia: string) {
        this.userId = userId;
        this.description = description;
        this.multimedia = multimedia;
    }
}
