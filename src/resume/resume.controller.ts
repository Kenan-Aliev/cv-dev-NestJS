import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {ResumeService} from "./resume.service";
import {Roles} from "../guards/roles-decorator.guard";
import {CustomRequest, RolesGuard} from "../guards/roles.guard";
import {CreateResumeDto} from "./dto/create-resume.dto";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResumesModel} from "./resume.model";

@ApiTags('Resume')
@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {
    }

    @ApiBearerAuth()
    @ApiOperation({summary: "Добавление резюме", description: 'Доступно только для разработчиков'})
    @ApiBody({
        type: CreateResumeDto
    })
    @ApiResponse({
        type: ResumesModel
    })
    @Roles('DEVELOPER')
    @UseGuards(RolesGuard)
    @Post('/create')
    createResume(@Req() req: CustomRequest, @Body() dto: CreateResumeDto) {
        console.log(dto)
        return this.resumeService.createResume(req, dto)
    }


    @Roles('COMPANY')
    @UseGuards(RolesGuard)
    @Get('/get/:resumeId')
    getResumeById(@Param('resumeId') resumeId) {
        return this.resumeService.getResumeById(Number(resumeId))
    }

    @Roles('DEVELOPER')
    @UseGuards(RolesGuard)
    @Get('/getMyResume')
    getMyResume(@Req() req: CustomRequest) {
        return this.resumeService.getUserResume(req.user.id)
    }


}
