// src/infrastructure/models/likeModel.ts

import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({
    tableName: 'likes',
    timestamps: true 
})
class LikeModel extends Model {
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
    public publicationId!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public userId!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public timestamp!: Date;
}

export default LikeModel;
