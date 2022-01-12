import {Injectable} from '@nestjs/common';
import {UserCreateDto} from "./dto/user-create.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(dto: UserCreateDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}})
        return user
    }

    async getUserByActivationLink(activationLink: string) {
        const user = await this.userRepository.findOne({where: {activationLink}})
        return user
    }

    async getUsers() {
        const users = await this.userRepository.findAll()
        return users
    }
}
