import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {MailerModule} from "@nestjs-modules/mailer";
import {ConfigService} from "../config/config.service";
import {ConfigModule} from "../config/config.module";

@Module({
    imports: [MailerModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            transport: {
                host: configService.emailHost,
                port: configService.emailPort,
                secure: false,
                auth: {
                    user: configService.emailID,
                    pass: configService.emailPASS
                }
            },

        }),
        inject: [ConfigService]

    })],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {
}
