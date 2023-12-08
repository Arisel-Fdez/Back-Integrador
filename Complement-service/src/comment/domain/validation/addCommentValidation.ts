import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class AddCommentValidation {
    @IsNotEmpty({ message: 'El ID de la publicación es obligatorio' })
    @IsInt({ message: 'El ID de la publicación debe ser un número entero' })
    @Min(1, { message: 'El ID de la publicación debe ser un número positivo' })
    public publicationId: number;

    @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
    @IsInt({ message: 'El ID de usuario debe ser un número entero' })
    @Min(1, { message: 'El ID de usuario debe ser un número positivo' })
    public userId: number;

    @IsNotEmpty({ message: 'El contenido es obligatorio' })
    @IsString({ message: 'El contenido debe ser una cadena de caracteres' })
    public content: string;

    constructor(publicationId: number, userId: number, content: string) {
        this.publicationId = publicationId;
        this.userId = userId;
        this.content = content;
    }
}
