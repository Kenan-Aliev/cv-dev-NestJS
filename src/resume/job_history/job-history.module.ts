import {Module} from '@nestjs/common';
import {JobHistoryService} from "./job-history.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {ResumesModel} from "../resume.model";
import {JobHistoryModel} from "./job-history.model";
import {DirectionModel} from "../../directions/directions.model";
import {DirectionsModule} from "../../directions/directions.module";
import {Job_historyTasksModel} from "../job_historyTasks/job_historyTasks.model";
import {Job_historyTasksModule} from "../job_historyTasks/job_historyTasks.module";

@Module({
    imports: [SequelizeModule.forFeature([JobHistoryModel, ResumesModel, DirectionModel, Job_historyTasksModel]), DirectionsModule, Job_historyTasksModule],
    providers: [JobHistoryService],
    exports: [JobHistoryService]
})
export class JobHistoryModule {

}
