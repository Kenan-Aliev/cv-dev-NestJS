import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {JobHistoryModel} from "./job-history.model";
import {CreateJobHistoryDto} from "../dto/createJobHistory.dto";
import {DirectionsService} from "../../directions/directions.service";


@Injectable()
export class JobHistoryService {
    constructor(@InjectModel(JobHistoryModel) private readonly jobHistoryRepository: typeof JobHistoryModel,
                private readonly directionService: DirectionsService) {

    }

    async addJobHistory(dto: CreateJobHistoryDto, resumeId: number) {
        const direction = await this.directionService.getDirectionByName(dto.direction_name)
        const jobHistory = await this.jobHistoryRepository.create({...dto, directionId: direction.id, resumeId})
        return jobHistory.id
    }

}