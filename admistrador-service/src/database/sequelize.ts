import { Sequelize } from 'sequelize-typescript';
import AccountModel from '../personalFinances/account/infraestructure/models/accountModel';
import UserModel from '../personalFinances/account/infraestructure/models/userModel';
import TransactionModel from '../personalFinances/transaction/infraestructure/models/transactionModel';
import CategoryModel from '../personalFinances/category/infraestructure/models/categoryModel';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();



export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 47762, 
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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