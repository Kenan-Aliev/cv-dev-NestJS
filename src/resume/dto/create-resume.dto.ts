import {CreateJobHistoryDto} from "./createJobHistory.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CreateResumeDto {
    @ApiProperty({type: [CreateJobHistoryDto]})
    jobHistory: CreateJobHistoryDto[]
}