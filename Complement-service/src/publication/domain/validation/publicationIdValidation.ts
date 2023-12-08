// PublicationIdValidation.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class PublicationIdValidation {
    @IsNotEmpty({ message: 'El ID de la publicación es obligatorio' })
    @IsString({ message: 'El ID de la publicación debe ser una cadena de caracteres' })
    public id: string;

    constructor(id: string) {
        this.id = id;
    }
}
