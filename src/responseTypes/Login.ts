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
    avatar: string | null

    @ApiProperty()
    isCompany: boolean

    @ApiProperty()
    tokens: Tokens
}

