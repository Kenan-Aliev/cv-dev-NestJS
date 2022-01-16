import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {VacancyService} from "./vacancy.service";
import {Roles} from "../guards/roles-decorator.guard";
import {CustomRequest, RolesGuard} from "../guards/roles.guard";
import {VacancyCreateDto} from "./dto/vacancy-create.dto";

@Controller('vacancy')
export class VacancyController {
    constructor(private readonly vacancyService: VacancyService) {
    }


    @Roles("COMPANY")
    @UseGuards(RolesGuard)
    @Post('create')
    create(@Req() req: CustomRequest, @Body() dto: VacancyCreateDto) {
        return this.vacancyService.create(req.user.email, dto)
    }
}
