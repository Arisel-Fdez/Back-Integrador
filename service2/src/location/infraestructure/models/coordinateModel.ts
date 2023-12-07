import { Model, DataType, Table, Column } from 'sequelize-typescript';
import UserModel from '../../../user/infraestructure/models/userModel';
import { ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: 'coordinates',
    timestamps: true
})
class CoordinateModel extends Model {
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public userId!: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    public latitude!: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    public longitude!: number;

    // Puedes agregar más campos si lo necesitas
}

export default CoordinateModel;
