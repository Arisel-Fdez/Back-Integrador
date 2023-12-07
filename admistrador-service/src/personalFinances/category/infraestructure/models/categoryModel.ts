import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'category',
    timestamps: false,
})
class CategoryModel extends Model {
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
    public name!: string;
}

export default CategoryModel;
