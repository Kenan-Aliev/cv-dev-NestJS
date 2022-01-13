import {Controller, Get, Req} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CustomRequest} from "../guards/roles.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get('all')
    getUsers(@Req() req: CustomRequest) {
        console.log(req.user)
        return this.usersService.getUsers()
    }

}
