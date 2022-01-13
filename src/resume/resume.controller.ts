import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {ResumeService} from "./resume.service";
import {Roles} from "../guards/roles-decorator.guard";
import {CustomRequest, RolesGuard} from "../guards/roles.guard";
import {CreateResumeDto} from "./dto/create-resume.dto";

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {
    }

    @Roles('DEVELOPER')
    @UseGuards(RolesGuard)
    @Post('/create')
    createResume(@Req() req: CustomRequest, @Body() dto: CreateResumeDto) {
        return this.resumeService.createResume(req, dto)
    }

    @Roles('COMPANY')
    @UseGuards(RolesGuard)
    @Get('/get/:resumeId')
    getResumeById(@Param('resumeId') resumeId) {
        return this.resumeService.getResume(Number(resumeId))
    }


}
