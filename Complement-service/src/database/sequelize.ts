import { Sequelize } from 'sequelize-typescript';

import UserModel from '../user/infraestructure/models/userModel';
import UserPublicationModel from '../publication/infraestructure/models/userPublicationModel';
import CommentModel from '../comment/infraestructure/models/commentModel';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();


export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 12463, 
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [UserModel, UserPublicationModel, CommentModel],
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