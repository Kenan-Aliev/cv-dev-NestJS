import {Body, Controller, Get, Param, Post, Redirect, Req, Res, UsePipes} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegistrationDto} from "./dto/registration.dto";
import {Request, Response} from "express";
import {ValidationPipe} from "../pipes/validation.pipe";
import {LoginDto} from "./dto/login.dto";
import {ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {RegisterResponse} from "../responseTypes/Register";
import {LoginResponse} from "../responseTypes/Login";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiBody({
        type: RegistrationDto
    })
    @Post('/registration')
    @ApiCreatedResponse({
        type: RegisterResponse,
        description: 'Возвращает модель пользователя и сообщение об отправке сообщения на почту'
    })
    registration(@Body() dto: RegistrationDto) {
        return this.authService.registration(dto)
    }


    @ApiOperation({summary: "Войти в аккаунт"})
    @ApiBody({
        type: LoginDto
    })
    @ApiResponse({
        type: LoginResponse,
        description: 'Возвращает access и refresh токены'
    })
    @UsePipes(new ValidationPipe())
    @Post('/login')
    async login(@Body() dto: LoginDto, @Res({passthrough: true}) res: Response) {
        const data = await this.authService.login(dto)
        res.cookie('refreshToken', data.tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            domain: process.env.CLIENT_URL
        })
        return res.json({...data})
    }


    @ApiOperation({summary: "Активация аккаунта"})
    @ApiParam({
        name: 'activationLink'
    })
    @ApiResponse({
        description: 'Перекинет на сайт со страницей об успешной активации аккаунта'
    })
    @Get('/activate/:activationLink')
    @Redirect(`http://localhost:3000`)
    async activate(@Param('activationLink') activationLink: string) {
        const url = await this.authService.activate(activationLink)
        return {url}
    }


    @ApiOperation({summary: "Выход из аккаунта"})
    @ApiResponse({
        description: 'Удаляет из cookies refreshToken'
    })
    @Get('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const {refreshToken} = req.cookies
        await this.authService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json({message: "Вы вышли из своего аккаунта"})
    }

}
