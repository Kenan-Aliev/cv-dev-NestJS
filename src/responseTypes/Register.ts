import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterResponse {
    @ApiProperty()
    message: string

    @ApiProperty()
    user: User
}