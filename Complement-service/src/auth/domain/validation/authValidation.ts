import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class AuthValidation {
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    public email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' }) // Ajusta la longitud mínima según tus requerimientos
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
