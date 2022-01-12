export class UserCreateDto {
    email: string
    username: string
    isCompany?: boolean
    activationLink: string
    password: string
}
