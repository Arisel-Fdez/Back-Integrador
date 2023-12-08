import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class DeleteCommentValidation {
    @IsNotEmpty({ message: 'El ID del comentario es obligatorio' })
    @IsInt({ message: 'El ID del comentario debe ser un número entero' })
    @Min(1, { message: 'El ID del comentario debe ser un número positivo' })
    public commentId: number;

    constructor(commentId: number) {
        this.commentId = commentId;
    }
}
