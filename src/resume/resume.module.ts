import {Module} from '@nestjs/common';
import {ResumeController} from './resume.controller';
import {ResumeService} from './resume.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ResumesModel} from "./resume.model";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {JobHistoryModule} from "./job_history/job-history.module";

@Module({
    imports: [SequelizeModule.forFeature([ResumesModel]), JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.jwtSecret
        }),
        inject: [ConfigService]
    }),
        JobHistoryModule],
    controllers: [ResumeController],
    providers: [ResumeService]
})
export class ResumeModule {
}
