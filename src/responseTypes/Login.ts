import {ApiProperty, ApiResponse} from "@nestjs/swagger";

export class Tokens {
    @ApiProperty()
    accessToken: string

    @ApiProperty()
    refreshToken: string
}


export class LoginResponse {
    @ApiProperty()
    id: number

    @ApiProperty()
    email: string

    @ApiProperty()
    isCompany: boolean

    @ApiProperty()
    tokens: Tokens
}

