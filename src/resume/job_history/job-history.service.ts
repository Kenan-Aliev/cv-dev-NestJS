import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {JobHistoryModel} from "./job-history.model";
import {CreateJobHistoryDto} from "../dto/createJobHistory.dto";
import {DirectionsService} from "../../directions/directions.service";
import {Job_historyTasksService} from "../job_historyTasks/job_historyTasks.service";


@Injectable()
export class JobHistoryService {
    constructor(@InjectModel(JobHistoryModel) private readonly jobHistoryRepository: typeof JobHistoryModel,
                private readonly directionService: DirectionsService,
                private readonly jobHistoryTasksService: Job_historyTasksService) {

    }

    async addJobHistory(dto: CreateJobHistoryDto, resumeId: number) {
        const direction = await this.directionService.getDirectionByName(dto.direction_name)
        const jobHistory = await this.jobHistoryRepository.create({
            start_date: dto.start_date,
            end_date: dto.end_date,
            company_name: dto.company_name,
            directionId: direction.id,
            resumeId
        })
        const jobHistoryTasksId = await this.jobHistoryTasksService.create(dto.tasks, jobHistory.id)
        await jobHistory.$set('job_historyTasks', jobHistoryTasksId)
        return jobHistory.id
    }

}