import dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript';
import AccountModel from '../personalFinances/account/infraestructure/models/accountModel';
import UserModel from '../personalFinances/account/infraestructure/models/userModel';
import TransactionModel from '../personalFinances/transaction/infraestructure/models/transactionModel';
import CategoryModel from '../personalFinances/category/infraestructure/models/categoryModel';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'monorail.proxy.rlwy.net',
    port: 47762, //Puerto
    database: 'railway',
    username: 'postgres',
    password: '3BfeGBdB*6G*bCBdDEG44b6315eAgFGA',
    models: [UserModel,AccountModel, TransactionModel, CategoryModel],
});

export async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error('No se pudo conectar a la base de datos:', err);
        process.exit(1);  // Cierra la aplicación si hay un error de conexión
    }
}