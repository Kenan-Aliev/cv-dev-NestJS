import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {TokensModule} from "../tokens/tokens.module";
import {MailModule} from "../mail/mail.module";
import {FilesModule} from "../files/files.module";

@Module({
    imports: [UsersModule, TokensModule, MailModule, FilesModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
