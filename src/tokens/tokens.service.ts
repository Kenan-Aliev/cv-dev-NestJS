import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "../users/users.model";
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/sequelize";
import {TokensModel} from "./tokens.model";

@Injectable()
export class TokensService {
    constructor(private jwtService: JwtService, @InjectModel(TokensModel) private tokenRepository: typeof TokensModel) {
    }

    generateTokens(user: User) {
        const accessToken = this.jwtService.sign({
            id: user.id,
            email: user.email,
            isCompany: user.isCompany
        }, {expiresIn: '30m'})
        const refreshToken = this.jwtService.sign({
            id: user.id,
            email: user.email,
            isCompany: user.isCompany
        }, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    async saveToken(refreshToken: string, userId: number) {
        const candidate = await this.tokenRepository.findOne({where: {userId}})
        if (!candidate) {
            await this.tokenRepository.create({value: refreshToken, userId})
            return
        } else {
            candidate.value = refreshToken
            await candidate.save()
            return
        }
    }

    async refresh(refreshToken: string) {
        const userData = this.validateRefreshToken(refreshToken)
        const tokenFromDb = await this.findToken(refreshToken)
        if (!refreshToken || !userData || !tokenFromDb) {
            throw new UnauthorizedException({message: 'Вы не авторизованы'})
        }
        const user = await User.findByPk(tokenFromDb.userId)
        const tokens = await this.generateTokens(user)
        await this.saveToken(tokens.refreshToken, user.id)
        return tokens
    }

    async findToken(refreshToken: string) {
        const token = await this.tokenRepository.findOne({where: {value: refreshToken}})
        return token
    }


    validateRefreshToken(refreshToken: string) {
        try {
            const userData = this.jwtService.verify(refreshToken)
            return userData
        } catch (e) {
            return null
        }
    }

    validateAccessToken(accessToken: string) {
        try {
            const userData = this.jwtService.verify(accessToken)
            return userData
        } catch (error) {
            return null
        }
    }

    async removeToken(refreshToken: string) {
        await this.tokenRepository.destroy({where: {value: refreshToken}})
        return
    }

}
