import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateDirectionDto} from "./dto/create-direction.dto";
import {DirectionsService} from "./directions.service";

@Controller('directions')
export class DirectionsController {
    constructor(private readonly directionService: DirectionsService) {
    }

    @Post('/create')
    createDirection(@Body() dto: CreateDirectionDto) {
        return this.directionService.createDirection(dto)
    }

    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.directionService.getDirectionByName(name)
    }
}
