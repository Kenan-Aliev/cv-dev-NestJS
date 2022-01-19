import {Module} from '@nestjs/common';
import {ResumeController} from './resume.controller';
import {ResumeService} from './resume.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ResumesModel} from "./resume.model";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {JobHistoryModule} from "./job_history/job-history.module";
import {Foreign_languagesModel} from "./foreign_languages/foreign_languages.model";
import {CoursesModel} from "./courses/courses.model";
import {User} from "../users/users.model";
import {CoursesModule} from "./courses/courses.module";
import {Foreign_languagesModule} from "./foreign_languages/foreign_languages.module";

@Module({
    imports: [SequelizeModule.forFeature([ResumesModel, Foreign_languagesModel, CoursesModel, User]), JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.jwtSecret
        }),
        inject: [ConfigService]
    }),
        JobHistoryModule,
        CoursesModule,
        Foreign_languagesModule],
    controllers: [ResumeController],
    providers: [ResumeService]
})
export class ResumeModule {
}
