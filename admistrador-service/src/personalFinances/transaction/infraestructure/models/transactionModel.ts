import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CategoryModel from '../../../category/infraestructure/models/categoryModel';
import AccountModel from '../../../account/infraestructure/models/accountModel';

@Table({
    tableName: 'transaction',
    timestamps: true
})
class TransactionModel extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public date!: Date;

    @Column({
        type: DataType.BOOLEAN, // Cambiar a BOOLEAN
        allowNull: false
    })
    public type!: boolean;

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public amount!: number;

    @Column({
        type: DataType.STRING(512),
        allowNull: false
    })
    public description!: string;

    @ForeignKey(() => CategoryModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public categoriId!: number;

    @BelongsTo(() => CategoryModel)
    public category!: CategoryModel;

    @ForeignKey(() => AccountModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public accountId!: number;

    @BelongsTo(() => AccountModel, {
        onDelete: 'CASCADE' // Esta línea indica eliminación en cascada
    })
    public account!: AccountModel;
}

export default TransactionModel;
