import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {TokensService} from "../tokens/tokens.service";

interface UserData {
    id: string
    email: string
}

export interface CustomRequest extends Request {
    user: UserData
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly tokensService: TokensService) {
    }

    use(req: CustomRequest, res: Response, next: NextFunction) {
        const header = req.headers.authorization
        if (!header) {
            throw new UnauthorizedException({message: "Вы не авторизованы"})
        }
        const bearer = header.split(' ')[0]
        const token = header.split(' ')[1]
        if (!bearer || !token) {
            throw new UnauthorizedException({message: "Вы не авторизованы"})
        }
        const userData = this.tokensService.validateAccessToken(token)
        if (!userData) {
            throw new UnauthorizedException({message: "Вы не авторизованы"})
        }
        req.user = userData
        next()
    }
}
