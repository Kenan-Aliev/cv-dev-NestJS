import {Module} from '@nestjs/common';
import {TokensController} from './tokens.controller';
import {TokensService} from './tokens.service';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "../config/config.service";
import {ConfigModule} from "../config/config.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {TokensModel} from "./tokens.model";
import {User} from "../users/users.model";

@Module({
    imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.jwtSecret
        }),
        inject: [ConfigService]
    }),
        SequelizeModule.forFeature([User, TokensModel])],
    controllers: [TokensController],
    providers: [TokensService],
    exports: [TokensService]
})
export class TokensModule {
}
