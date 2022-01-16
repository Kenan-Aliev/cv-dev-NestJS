import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/users.model";
import {TokensModule} from './tokens/tokens.module';
import {ConfigModule as Config} from './config/config.module';
import {TokensModel} from "./tokens/tokens.model";
import {MailModule} from './mail/mail.module';
import {ResumeModule} from './resume/resume.module';
import {ResumesModel} from "./resume/resume.model";
import {JobHistoryModule} from './resume/job_history/job-history.module';
import {JobHistoryModel} from "./resume/job_history/job-history.model";
import {DirectionsModule} from './directions/directions.module';
import {DirectionModel} from "./directions/directions.model";
import {Job_historyTasksModel} from "./resume/job_historyTasks/job_historyTasks.model";
import {Job_historyTasksModule} from "./resume/job_historyTasks/job_historyTasks.module";
import {VacancyModule} from './vacancy/vacancy.module';
import {VacancyModel} from "./vacancy/vacancy.model";

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: `${process.env.NODE_ENV === 'production' ? '.prod.env' : '.env'}`,
           // ignoreEnvFile: true,
        isGlobal: true
    }), UsersModule, AuthModule,
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            synchronize: true,
            models: [User, TokensModel, ResumesModel, JobHistoryModel, DirectionModel, Job_historyTasksModel, VacancyModel],
            autoLoadModels: true,
            ssl: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }),
        TokensModule,
        Config,
        MailModule,
        ResumeModule,
        JobHistoryModule,
        DirectionsModule,
        Job_historyTasksModule,
        VacancyModule],

    controllers: [],
    providers: [],
})
export class AppModule {
}
