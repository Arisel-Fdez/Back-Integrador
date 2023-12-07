import { Model, DataType, Table, Column, ForeignKey, BelongsTo, AfterCreate} from 'sequelize-typescript';
import UserModel from './userModel';

@Table({
    tableName: 'account',
    timestamps: false,
})
class AccountModel extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;

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
        allowNull: false,
        defaultValue:0,
    })
    public balance!: number;

}

export default AccountModel;
