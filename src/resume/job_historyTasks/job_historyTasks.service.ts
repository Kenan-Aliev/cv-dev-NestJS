import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Job_historyTasksModel} from "./job_historyTasks.model";

@Injectable()
export class Job_historyTasksService {
    constructor(@InjectModel(Job_historyTasksModel) private readonly jobHistoryTasksRepository: typeof Job_historyTasksModel) {
    }

    async create(jobHistoryTasks: string[], jobHistoryId: number) {
        let jobHistoryTasksObj: {
            [key: string]: string | number
        } = {}
        for (let i = 0; i < jobHistoryTasks.length; i++) {
            jobHistoryTasksObj = {...jobHistoryTasksObj, [`field${i + 1}`]: jobHistoryTasks[i]}
        }
        jobHistoryTasksObj.jobHistoryId = jobHistoryId
        const jobHistoryTask = await this.jobHistoryTasksRepository.create(jobHistoryTasksObj)
        return jobHistoryTask.id
    }

}