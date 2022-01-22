import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-decorator.guard";
import {Request} from "express";


interface UserData {
    id: number
    email: string
    isCompany: boolean
}

export interface CustomRequest extends Request {
    user: UserData
}


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            const user = this.jwtService.verify(token)
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"})
            }
            req.user = user
            if (!requiredRoles && user) {
                return true
            } else if (requiredRoles && user.isCompany && requiredRoles.includes('COMPANY')) {
                return true
            } else if (requiredRoles && !user.isCompany && requiredRoles.includes('DEVELOPER')) {
                return true
            }
            return false
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
        }
    }
}