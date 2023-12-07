import { Coordinate } from "../domain/coordinate";
import { CoordinateRepository } from "../domain/coordinateRepository";

export class AddCoordinateUseCase {
    constructor(private readonly coordinateRepository: CoordinateRepository) {}

    async run(userId: number, latitude: number, longitude: number): Promise<Coordinate | null> {
        return this.coordinateRepository.addCoordinate(userId, latitude, longitude);
    }
}
