import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserValidation {

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
    @Length(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' })
    public name: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser una cadena de caracteres' })
    @Length(1, 255, { message: 'El apellido debe tener entre 1 y 255 caracteres' })
    public last_name: string;

    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
    public email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
    public password: string;

    constructor(name: string, last_name: string, email: string, password: string, id?: number) {
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}
