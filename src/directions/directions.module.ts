import {Module} from '@nestjs/common';
import {DirectionsController} from './directions.controller';
import {DirectionsService} from './directions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {DirectionModel} from "./directions.model";
import {JobHistoryModel} from "../resume/job_history/job-history.model";

@Module({
    imports: [SequelizeModule.forFeature([DirectionModel])],
    controllers: [DirectionsController],
    providers: [DirectionsService],
    exports: [DirectionsService]
})
export class DirectionsModule {
}
