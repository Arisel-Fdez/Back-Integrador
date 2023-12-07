import CoordinateModel from './models/coordinateModel';
import UserModel from '../../user/infraestructure/models/userModel';
import { Coordinate } from '../domain/coordinate';
import { CoordinateRepository } from '../domain/coordinateRepository';

export class PgsqlCoordinateRepository implements CoordinateRepository {
    
    async addCoordinate(userId: number, latitude: number, longitude: number): Promise<Coordinate | null> {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) throw new Error('Usuario no encontrado.');

            const coordinate = await CoordinateModel.create({
                userId,
                latitude,
                longitude
            });

            return new Coordinate(coordinate.id, coordinate.userId, coordinate.latitude, coordinate.longitude);
        } catch (error) {
            console.error("Error in PgsqlCoordinateRepository:", error);
            return null;
        }
    }

    async getCoordinatesByUserId(userId: number): Promise<Coordinate[]> {
        try {
            const coordinates = await CoordinateModel.findAll({
                where: { userId }
            });

            return coordinates.map(coordinate => new Coordinate(coordinate.id, coordinate.userId, coordinate.latitude, coordinate.longitude));
        } catch (error) {
            console.error("Error in PgsqlCoordinateRepository getCoordinatesByUserId:", error);
            return [];
        }
    }

    // Puedes agregar más métodos si son necesarios, como obtener todas las coordenadas, coordenadas por usuario, etc.
}
