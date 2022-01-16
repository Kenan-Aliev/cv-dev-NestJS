import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ResumesModel} from "./resume.model";
import {CustomRequest} from "../guards/roles.guard";
import {JobHistoryService} from "./job_history/job-history.service";
import {CreateJobHistoryDto} from "./dto/createJobHistory.dto";
import {CreateResumeDto} from "./dto/create-resume.dto";
import {User} from "../users/users.model";
import {JobHistoryModel} from "./job_history/job-history.model";
import {DirectionModel} from "../directions/directions.model";
import {Job_historyTasksModel} from "./job_historyTasks/job_historyTasks.model";

@Injectable()
export class ResumeService {
    constructor(@InjectModel(ResumesModel) private readonly resumesRepository: typeof ResumesModel,
                private readonly jobHistoryService: JobHistoryService) {
    }

    async createResume(req: CustomRequest, dto: CreateResumeDto) {
        const resume = await this.resumesRepository.create({userId: req.user.id})
        const jobHistories = await this.createJobHistory(dto.jobHistory, resume.id)
        await resume.$set('jobHistory', [...jobHistories])
        return resume
    }

    async createJobHistory(dto: CreateJobHistoryDto[], resumeId: number): Promise<number[]> {
        let jobHistories = []

        for (let i = 0; i < dto.length; i++) {
            jobHistories[i] = await this.jobHistoryService.addJobHistory(dto[i], resumeId)
        }
        return jobHistories
    }


    async getResume(resumeId: number) {
        const resume = await this.resumesRepository.findByPk(resumeId, {
            include: [{
                model: User,
                attributes: ['email', 'username']
            },
                {
                    model: JobHistoryModel,
                    include: [DirectionModel, Job_historyTasksModel]
                }]
        })
        return resume

    }

}
