import { Coordinate } from "./coordinate";

export interface CoordinateRepository {
    addCoordinate(userId: number, latitude: number, longitude: number): Promise<Coordinate | null>;
    getCoordinatesByUserId(userId: number): Promise<Coordinate[]>;
}
