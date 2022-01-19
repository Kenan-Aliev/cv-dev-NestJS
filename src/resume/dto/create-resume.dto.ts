import {CreateJobHistoryDto} from "./createJobHistory.dto";
import {ApiProperty} from "@nestjs/swagger";
import {CreateCoursesDto} from "./createCourses.dto";
import {CreateForeignLanguagesDto} from "./createForeignLanguages.dto";

export class CreateResumeDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    surname: string

    @ApiProperty()
    patronymic: string

    @ApiProperty()
    phone: string

    @ApiProperty()
    sphere: string

    @ApiProperty()
    city: string

    @ApiProperty()
    email: string

    @ApiProperty()
    birthday: string

    @ApiProperty()
    github: string

    @ApiProperty()
    wished_salary: string

    @ApiProperty()
    busyness: string

    @ApiProperty()
    description: string

    @ApiProperty({type: [CreateJobHistoryDto]})
    exp_work: CreateJobHistoryDto[]


    @ApiProperty({type: [CreateCoursesDto]})
    courses: CreateCoursesDto[]

    @ApiProperty({type: [CreateForeignLanguagesDto]})
    foreign_languages: CreateForeignLanguagesDto[]
}