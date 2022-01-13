import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {DirectionModel} from "./directions.model";
import {CreateDirectionDto} from "./dto/create-direction.dto";

@Injectable()
export class DirectionsService {
    constructor(@InjectModel(DirectionModel) private readonly directionRepository: typeof DirectionModel) {

    }

    async createDirection(dto: CreateDirectionDto) {
        const direction = await this.directionRepository.create(dto)
        return direction
    }

    async getDirectionByName(name: string) {
        console.log(name)
        const direction = await this.directionRepository.findOne({where: {direction_name: name}})
        return direction
    }

}
