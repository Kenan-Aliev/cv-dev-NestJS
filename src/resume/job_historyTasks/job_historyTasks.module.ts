import {Module} from "@nestjs/common";
import {Job_historyTasksService} from "./job_historyTasks.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {JobHistoryModel} from "../job_history/job-history.model";
import {Job_historyTasksModel} from "./job_historyTasks.model";

@Module({
    imports: [SequelizeModule.forFeature([JobHistoryModel, Job_historyTasksModel])],
    providers: [Job_historyTasksService],
    exports: [Job_historyTasksService]
})

export class Job_historyTasksModule {
}