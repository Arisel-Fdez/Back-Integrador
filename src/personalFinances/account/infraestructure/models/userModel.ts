import { Model, DataType, Table, Column } from 'sequelize-typescript';
import { HasMany } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: true 
})
class UserModel extends Model {
   
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;
 
}

export default UserModel;
