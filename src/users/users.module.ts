import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {TokensModel} from "../tokens/tokens.model";
import {AuthMiddleware} from "../midllewares/auth-middleware";
import {TokensModule} from "../tokens/tokens.module";

@Module({
    imports: [SequelizeModule.forFeature([User, TokensModel]),TokensModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(AuthMiddleware)
            .forRoutes('users/all');
    }
}
