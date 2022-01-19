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
import {CreateCoursesDto} from "./dto/createCourses.dto";
import {CreateForeignLanguagesDto} from "./dto/createForeignLanguages.dto";
import {CoursesService} from "./courses/courses.service";
import {Foreign_languagesService} from "./foreign_languages/foreign_languages.service";
import {CoursesModel} from "./courses/courses.model";
import {Foreign_languagesModel} from "./foreign_languages/foreign_languages.model";

@Injectable()
export class ResumeService {
    constructor(@InjectModel(ResumesModel) private readonly resumesRepository: typeof ResumesModel,
                private readonly jobHistoryService: JobHistoryService,
                private readonly coursesService: CoursesService,
                private readonly foreignLanguagesService: Foreign_languagesService) {
    }

    async createResume(req: CustomRequest, dto: CreateResumeDto) {
        const resume = await this.resumesRepository.create({...dto, userId: req.user.id})
        const jobHistories = await this.createJobHistory(dto.exp_work, resume.id)
        const courses = await this.createCourses(dto.courses, resume.id)
        const foreignLanguages = await this.createForeignLanguages(dto.foreign_languages, resume.id)
        await resume.$set('jobHistory', [...jobHistories])
        await resume.$set('foreignLanguages', [...foreignLanguages])
        await resume.$set('courses', [...courses])
        return resume
    }

    async createJobHistory(dto: CreateJobHistoryDto[], resumeId: number): Promise<number[]> {
        let jobHistories = []

        for (let i = 0; i < dto.length; i++) {
            jobHistories[i] = await this.jobHistoryService.addJobHistory(dto[i], resumeId)
        }
        return jobHistories
    }


    async createCourses(dto: CreateCoursesDto[], resumeId: number): Promise<number[]> {
        let courses = []

        for (let i = 0; i < dto.length; i++) {
            courses[i] = await this.coursesService.addCourse(dto[i], resumeId)
        }
        return courses
    }


    async createForeignLanguages(dto: CreateForeignLanguagesDto[], resumeId: number): Promise<number[]> {
        let foreignLanguages = []

        for (let i = 0; i < dto.length; i++) {
            foreignLanguages[i] = await this.foreignLanguagesService.addForeignLanguage(dto[i], resumeId)
        }
        return foreignLanguages
    }


    async getResumeById(resumeId: number) {
        const resume = await this.resumesRepository.findByPk(resumeId, {
            include: [{
                model: User,
                attributes: ['email', 'username']
            },
                {
                    model: JobHistoryModel,
                    include: [DirectionModel]
                },
                {
                    model: CoursesModel
                },
                {
                    model: Foreign_languagesModel
                }]
        })
        return resume

    }


    async getUserResumes(userId: number) {
        const resumes = await this.resumesRepository.findAll({
            where: {userId},
            include: [{
                model: User,
                attributes: ['email', 'username']
            },
                {
                    model: JobHistoryModel,
                    include: [DirectionModel]
                },
                {
                    model: CoursesModel
                },
                {
                    model: Foreign_languagesModel
                }]
        })
        return resumes

    }

}
