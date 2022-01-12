import {Module} from '@nestjs/common';
import {ResumeController} from './resume.controller';
import {ResumeService} from './resume.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ResumesModel} from "./resume.model";

@Module({
    imports: [SequelizeModule.forFeature([ResumesModel])],
    controllers: [ResumeController],
    providers: [ResumeService]
})
export class ResumeModule {
}
