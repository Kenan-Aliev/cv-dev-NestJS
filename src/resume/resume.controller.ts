import {Body, Controller, Post} from '@nestjs/common';
import {ResumeService} from "./resume.service";
import {CreateResumeDto} from "./dto/create-resume.dto";

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {
    }

    @Post('/create')
    createResume(@Body() dto: CreateResumeDto) {
        return this.resumeService.createResume(dto)
    }
}
