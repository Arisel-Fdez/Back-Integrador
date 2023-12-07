import { Sequelize } from 'sequelize-typescript';

import UserModel from '../user/infraestructure/models/userModel';
import UserPublicationModel from '../publication/infraestructure/models/userPublicationModel';
import LikeModel from '../reaction/infraestructure/models/likeModel';
import CommentModel from '../comment/infraestructure/models/commentModel';
import CoordinateModel from '../location/infraestructure/models/coordinateModel';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'roundhouse.proxy.rlwy.net',
    port: 12463, // Puerto
    database: 'railway',
    username: 'postgres',
    password: '-f-ABE235Eb*fBcFcF34e1DbCG3e4Cd*',
    models: [UserModel, UserPublicationModel, LikeModel, CommentModel, CoordinateModel],
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