import { Model, DataType, Table, Column } from 'sequelize-typescript';
import { ForeignKey, BelongsTo } from 'sequelize-typescript';
import UserPublicationModel from '../../../publication/infraestructure/models/userPublicationModel';
import UserModel from '../../../user/infraestructure/models/userModel';

@Table({
    tableName: 'comment',
    timestamps: true
})
class CommentModel extends Model {
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public userId!: number;

    @BelongsTo(() => UserModel, {
        onDelete: 'CASCADE' // Esta línea indica eliminación en cascada
    })
    public user!: UserModel;

    @ForeignKey(() => UserPublicationModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public publicationId!: number;

    @BelongsTo(() => UserPublicationModel)
    public publication!: UserPublicationModel;

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    public content!: string;
}

export default CommentModel;
