import { Model, DataType, Table, Column } from 'sequelize-typescript';
import { ForeignKey, BelongsTo } from 'sequelize-typescript';
import UserModel from '../../../user/infraestructure/models/userModel';

@Table({
    tableName: 'publication',
    timestamps: true 
})
class UserPublicationModel extends Model {

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

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public description!: string;

    // Agrega esto
    @Column({
        type: DataType.STRING(512), // 512 caracteres deberían ser suficientes para una URL, pero puedes ajustar según tus necesidades.
        allowNull: true // Puede ser nulo si el usuario no sube una imagen
    })
    public multimedia!: string;  
}

export default UserPublicationModel;