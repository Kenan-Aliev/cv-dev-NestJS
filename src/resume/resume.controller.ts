import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {ResumeService} from "./resume.service";
import {Roles} from "../guards/roles-decorator.guard";
import {CustomRequest, RolesGuard} from "../guards/roles.guard";
import {CreateResumeDto} from "./dto/create-resume.dto";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
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
        return this.resumeService.createResume(req, dto)
    }


    @ApiBearerAuth()
    @ApiOperation({summary: "Получение резюме по его ID", description: 'Доступно только для компаний'})
    @ApiParam({
        name: 'resumeId'
    })
    @ApiResponse({
        type: CreateResumeDto,
        description: ' Возвращает модель резюме'
    })
    @Roles('COMPANY')
    @UseGuards(RolesGuard)
    @Get('/get/:resumeId')
    getResumeById(@Param('resumeId') resumeId, userId = null) {
        return this.resumeService.getResumeById(Number(resumeId), userId)
    }


    @ApiBearerAuth()
    @ApiOperation({summary: "Получение резюме разработчика по ID", description: 'Доступно только для разработчиков'})
    @ApiResponse({
        type: CreateResumeDto,
        description: ' Возвращает одно резюме пользователя'
    })
    @Roles('DEVELOPER')
    @UseGuards(RolesGuard)
    @Get('/getMyResume/:id')
    getMyResumeById(@Param('id') resumeId: string, @Req() req: CustomRequest) {
        return this.resumeService.getResumeById(Number(resumeId), req.user.id)
    }

    @ApiBearerAuth()
    @ApiOperation({summary: "Получение резюме разработчика", description: 'Доступно только для разработчиков'})
    @ApiResponse({
        type: [CreateResumeDto],
        description: ' Возвращает все резюме пользователя'
    })
    @Roles('DEVELOPER')
    @UseGuards(RolesGuard)
    @Get('/getMyResumes')
    getMyResume(@Req() req: CustomRequest) {
        return this.resumeService.getUserResumes(req.user.id)
    }


    @ApiBearerAuth()
    @ApiOperation({summary: "Удаление резюме разработчика по ID", description: 'Доступно только для разработчиков'})
    @ApiResponse({
        description: 'Удаляет резюме пользователя'
    })
    @Roles('DEVELOPER')
    @UseGuards(RolesGuard)
    @Delete('/deleteMyResume/:id')
    deleteMyResume(@Param('id') resumeId: string, @Req() req: CustomRequest) {
        return this.resumeService.deleteMyResume(Number(resumeId), req.user.id)
    }


}
