import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ResumesModel} from "./resume.model";
import {CreateResumeDto} from "./dto/create-resume.dto";

@Injectable()
export class ResumeService {
    constructor(@InjectModel(ResumesModel) private readonly resumesRepository: typeof ResumesModel) {

    }

    async createResume(dto:CreateResumeDto){
        const resume = await this.resumesRepository.create(dto)
        return resume
    }

}
