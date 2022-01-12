import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    constructor(private mailer: MailerService) {
    }

    async sendConfirmationLetter(to: string, activationLink: string): Promise<void> {
        try {
            await this.mailer.sendMail({
                to,
                from: process.env.EMAIL_ID,
                subject: 'Активация аккаунта',
                html: `
                Перейдите по ссылке <a href="${process.env.BASE_URL}/auth/activate/${activationLink}">Нажмите</a>
                `
            });
        } catch (e) {
            console.log(e)
            throw new HttpException('Ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
