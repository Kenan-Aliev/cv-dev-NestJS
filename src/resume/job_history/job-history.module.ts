import {Module} from '@nestjs/common';
import {JobHistoryService} from "./job-history.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {ResumesModel} from "../resume.model";
import {JobHistoryModel} from "./job-history.model";
import {DirectionModel} from "../../directions/directions.model";
import {DirectionsModule} from "../../directions/directions.module";

@Module({
    imports: [SequelizeModule.forFeature([JobHistoryModel, ResumesModel])],
    providers: [JobHistoryService],
    exports: [JobHistoryService]
})
export class JobHistoryModule {

}
