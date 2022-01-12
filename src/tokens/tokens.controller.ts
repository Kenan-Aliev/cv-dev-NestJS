import {Controller, Get, Req, Res} from '@nestjs/common';
import {TokensService} from "./tokens.service";
import {Request, Response} from "express";

@Controller('tokens')
export class TokensController {
    constructor(private readonly tokensService: TokensService) {
    }

    @Get('refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const {refreshToken} = req.cookies
        const tokens = await this.tokensService.refresh(refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return res.json(tokens)
    }

}
