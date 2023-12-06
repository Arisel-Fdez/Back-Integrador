import { Coordinate } from "../domain/coordinate";
import { CoordinateRepository } from "../domain/coordinateRepository";


export class GetCoordinatesByUserIdUseCase {
    constructor(private readonly coordinateRepository: CoordinateRepository) {}

    async run(userId: number): Promise<Coordinate[]> {
        return this.coordinateRepository.getCoordinatesByUserId(userId);
    }
}
