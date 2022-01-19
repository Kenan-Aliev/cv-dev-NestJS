import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CoursesModel} from "./courses.model";
import {CreateCoursesDto} from "../dto/createCourses.dto";

@Injectable()
export class CoursesService {
    constructor(@InjectModel(CoursesModel) private readonly coursesRepository: typeof CoursesModel) {
    }

    async addCourse(dto: CreateCoursesDto, resumeId: number) {
        const course = await this.coursesRepository.create({...dto, resumeId})
        return course.id
    }
}