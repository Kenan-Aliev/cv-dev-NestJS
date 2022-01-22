import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt'
import {TokensService} from "../tokens/tokens.service";
import * as uuid from 'uuid'
import {RegistrationDeveloperDto} from "./dto/registrationDeveloper.dto";
import {MailService} from "../mail/mail.service";
import {LoginDto} from "./dto/login.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private tokensService: TokensService,
                private readonly mailService: MailService,
                private readonly filesService: FilesService) {
    }

    async registration(dto: RegistrationDeveloperDto, avatar) {
        if (!dto.email || !dto.username || !dto.password) {
            throw new HttpException('Заполните все поля', HttpStatus.BAD_REQUEST)
        }
        const candidate = await this.userService.getUserByEmail(dto.email, dto.username)
        if (candidate && candidate.email === dto.email) {
            throw new HttpException(`Пользователь с email ${dto.email} уже существует`, HttpStatus.BAD_REQUEST)
        } else if (candidate && candidate.username === dto.username) {
            throw new HttpException(`Пользователь с именем ${dto.username} уже существует`, HttpStatus.BAD_REQUEST)
        }
        const activationLink = uuid.v4()
        let fileName
        if (avatar) {
            fileName = await this.filesService.createFile(avatar)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.createUser({...dto, activationLink, password: hashPassword})
        if (fileName) {
            user.avatar = fileName
            await user.save()
        }
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
        return {id: user.id, email: user.email, avatar: user?.avatar, isCompany: user.isCompany, tokens}
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
