import {Controller, Get, Req, Res} from '@nestjs/common';
import {TokensService} from "./tokens.service";
import {Request, Response} from "express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Tokens} from "../responseTypes/Login";

@ApiTags('Tokens')
@Controller('tokens')
export class TokensController {
    constructor(private readonly tokensService: TokensService) {
    }

    @ApiOperation({
        summary: 'Для обновления accessToken и refreshToken',
        description: 'Использовать когда кончается срок действия accessToken или refreshToken'
    })
    @ApiResponse({
        type: Tokens,
        description: 'Возвращает обновленные токены'
    })
    @Get('refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const {refreshToken} = req.cookies
        const tokens = await this.tokensService.refresh(refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return res.json(tokens.accessToken)
    }

}
