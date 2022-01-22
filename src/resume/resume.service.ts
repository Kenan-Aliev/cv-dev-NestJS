import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ResumesModel} from "./resume.model";
import {CustomRequest} from "../guards/roles.guard";
import {JobHistoryService} from "./job_history/job-history.service";
import {CreateJobHistoryDto} from "./dto/createJobHistory.dto";
import {CreateResumeDto} from "./dto/create-resume.dto";
import {JobHistoryModel} from "./job_history/job-history.model";
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
        const jobHistories = await this.createResumeItems<CreateJobHistoryDto>(dto.exp_work, resume.id)
        const courses = await this.createResumeItems<CreateCoursesDto>(dto.courses, resume.id)
        const foreignLanguages = await this.createResumeItems<CreateForeignLanguagesDto>(dto.foreign_languages, resume.id)
        await resume.$set('exp_work', [...jobHistories])
        await resume.$set('foreign_languages', [...foreignLanguages])
        await resume.$set('courses', [...courses])
        return resume
    }


    async createResumeItems<T extends CreateJobHistoryDto | CreateCoursesDto | CreateForeignLanguagesDto>
    (dto: T[], resumeId: number): Promise<number[]> {
        let items = []
        for (let i = 0; i < dto.length; i++) {
            if (Object.keys(dto[i]).includes('from')) {
                items[i] = await this.jobHistoryService.addJobHistory(dto[i] as CreateJobHistoryDto, resumeId)
            } else if (Object.keys(dto[i]).includes('education_institution')) {
                items[i] = await this.coursesService.addCourse(dto[i] as CreateCoursesDto, resumeId)
            } else if (Object.keys(dto[i]).includes('level')) {
                items[i] = await this.foreignLanguagesService.addForeignLanguage(dto[i] as CreateForeignLanguagesDto, resumeId)
            }
        }
        return items
    }


    async getResumeById(resumeId: number, userId: number | null) {
        let resume
        if (resumeId && userId) {
            resume = await this.resumesRepository.findOne({
                where: {id: resumeId, userId},
                attributes: {
                    exclude: ['userId']
                },
                include: [
                    {
                        model: JobHistoryModel,
                        attributes: {
                            exclude: ['id', 'resumeId',]
                        },
                    },
                    {
                        model: CoursesModel,
                        attributes: {
                            exclude: ['id', 'resumeId']
                        }
                    },
                    {
                        model: Foreign_languagesModel,
                        attributes: {
                            exclude: ['id', 'resumeId']
                        }
                    }]
            })
        } else if (resumeId && !userId) {
            resume = await this.resumesRepository.findByPk(
                resumeId,
                {
                    attributes: {
                        exclude: ['userId']
                    },
                    include: [
                        {
                            model: JobHistoryModel,
                            attributes: {
                                exclude: ['id', 'resumeId',]
                            },
                        },
                        {
                            model: CoursesModel,
                            attributes: {
                                exclude: ['id', 'resumeId']
                            }
                        },
                        {
                            model: Foreign_languagesModel,
                            attributes: {
                                exclude: ['id', 'resumeId']
                            }
                        }]
                })
        }
        return resume

    }


    async getUserResumes(userId: number) {
        let resumes: ResumesModel[] = await this.resumesRepository.findAll({
            where: {userId},
            attributes: {
                exclude: ['userId']
            },
            include: [
                {
                    model: JobHistoryModel,
                    attributes: {
                        exclude: ['id', 'resumeId',]
                    },
                },
                {
                    model: CoursesModel,
                    attributes: {
                        exclude: ['id', 'resumeId']
                    }
                },
                {
                    model: Foreign_languagesModel,
                    attributes: {
                        exclude: ['id', 'resumeId']
                    }
                }],
        })
        return resumes

    }


    async deleteMyResume(resumeId: number, userId: number) {
        const resume = await this.resumesRepository.destroy({where: {id: resumeId, userId}})
        if (resume === 0) {
            return {message: "Такого резюме не существует"}
        }
        return {message: "Резюме успешно удалено"}
    }

}
