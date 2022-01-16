import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt'
import {TokensService} from "../tokens/tokens.service";
import * as uuid from 'uuid'
import {RegistrationDto} from "./dto/registration.dto";
import {MailService} from "../mail/mail.service";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private tokensService: TokensService,
                private readonly mailService: MailService) {
    }

    async registration(dto: RegistrationDto) {
        if (!dto.email || !dto.password) {
            throw new HttpException('Заполните все поля', HttpStatus.BAD_REQUEST)
        }
        const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException(`Пользователь с email ${dto.email} уже существует`, HttpStatus.BAD_REQUEST)
        }
        const activationLink = uuid.v4()
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.createUser({...dto, activationLink, password: hashPassword})
        await this.mailService.sendConfirmationLetter(user.email, activationLink)
        return {
            message: 'На вашу почту отправлено письмо для активации аккаунта',
            user
        }
    }

    async login(dto: LoginDto) {
        const user = await this.userService.getUserByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException({message: 'Пользователя с таким email не существует'})
        }
        const comparePass = await bcrypt.compare(dto.password, user.password)
        if (!comparePass) {
            throw new UnauthorizedException({message: 'Неверный пароль'})
        }

        const tokens = this.tokensService.generateTokens(user)
        await this.tokensService.saveToken(tokens.refreshToken, user.id)
        return {id: user.id, email: user.email, isCompany: user.isCompany, tokens}
    }

    async activate(activationLink: string) {
        const user = await this.userService.getUserByActivationLink(activationLink)
        const clientActivateUrl = `${process.env.CLIENT_URL}/auth/activate/`
        if (!user) {
            return clientActivateUrl + 'error'
        } else if (user && user.isActivated) {
            return clientActivateUrl + 'already-activated'
        } else {
            user.isActivated = true
            await user.save()
            return clientActivateUrl + 'activated'
        }

    }

    async logout(refreshToken: string) {
        await this.tokensService.removeToken(refreshToken)
        return
    }
}
