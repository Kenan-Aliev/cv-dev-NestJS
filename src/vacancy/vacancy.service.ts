import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {VacancyModel} from "./vacancy.model";
import {VacancyCreateDto} from "./dto/vacancy-create.dto";
import {DirectionsService} from "../directions/directions.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class VacancyService {
    constructor(@InjectModel(VacancyModel) private readonly vacancyRepository: typeof VacancyModel,
                private readonly directionService: DirectionsService,
                private readonly usersService: UsersService) {
    }

    async create(companyEmail: string, dto: VacancyCreateDto) {
        const direction = await this.directionService.getDirectionByName(dto.direction_name)
        const company = await this.usersService.getUserByEmail(companyEmail)
        const vacancy = await this.vacancyRepository.create({
            companyId: company.id,
            directionId: direction.id,
            title: dto.title
        })
        await company.$add('vacancies', vacancy.id)
        await direction.$add('vacancies', vacancy.id)
        return vacancy
    }
}
