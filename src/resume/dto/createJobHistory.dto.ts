import {ApiProperty} from "@nestjs/swagger";

export class CreateJobHistoryDto {
    @ApiProperty()
    start_date: Date

    @ApiProperty()
    end_date: Date

    @ApiProperty()
    company_name: string

    @ApiProperty()
    direction_name: string

    @ApiProperty()
    tasks: string[]
}