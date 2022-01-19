import {ApiProperty} from "@nestjs/swagger";

export class CreateCoursesDto {
    @ApiProperty()
    profession: string

    @ApiProperty()
    education_institution: string

    @ApiProperty()
    year_of_ending: string
}