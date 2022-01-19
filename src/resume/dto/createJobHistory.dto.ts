import {ApiProperty} from "@nestjs/swagger";

export class CreateJobHistoryDto {
    @ApiProperty()
    from: string

    @ApiProperty()
    to: string

    @ApiProperty()
    organization: string

    @ApiProperty()
    sphere: string

    @ApiProperty()
    responsibilities: string
}