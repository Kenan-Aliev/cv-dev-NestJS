import {Body, Controller, Get, Param, Post, Redirect, Req, Res, UsePipes} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/registration.dto";
import {Request, Response} from "express";
import {ValidationPipe} from "../pipes/validation.pipe";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UsePipes(new ValidationPipe())
    @Post('/registration')
    registration(@Body() dto: AuthDto) {
        return this.authService.registration(dto)
    }

    @UsePipes(new ValidationPipe())
    @Post('/login')
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        const data = await this.authService.login(dto)
        res.cookie('refreshToken', data.tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return res.json({...data})
    }

    @Get('/activate/:activationLink')
    @Redirect(`http://localhost:3000`)
    async activate(@Param('activationLink') activationLink: string) {
        const url = await this.authService.activate(activationLink)
        return {url}
    }

    @Get('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const {refreshToken} = req.cookies
        await this.authService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json({message: "Вы вышли из своего аккаунта"})
    }

}
