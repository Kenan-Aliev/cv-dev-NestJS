import {Module} from '@nestjs/common';
import {VacancyController} from './vacancy.controller';
import {VacancyService} from './vacancy.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {VacancyModel} from "./vacancy.model";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {DirectionsModule} from "../directions/directions.module";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [SequelizeModule.forFeature([VacancyModel]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.jwtSecret
            }),
            inject: [ConfigService]
        }),
        DirectionsModule,
        UsersModule],
    controllers: [VacancyController],
    providers: [VacancyService]
})
export class VacancyModule {
}
