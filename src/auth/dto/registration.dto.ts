import { IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';

export class RegistrationDto {
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: 'Некорректный email'})
    email: string

    @ApiProperty({
        minLength: 4,
        maxLength: 16
    })
    @IsString({message: "Должно быть строкой"})
    @Length(4, 16, {message: "Должно быть минимум 4 и максимум 16 символов"})
    username: string

    @ApiProperty({
        description: 'Требуется если пользователь регается как компания.В таком случае в качестве значения устанавливаем true',
        required: false,
        type: 'boolean'
    })
    isCompany?: boolean

    @ApiProperty({
        minLength: 4,
        maxLength: 16
    })
    @IsString({message: "Должно быть строкой"})
    @Length(4, 16, {message: "Должно быть минимум 4 и максимум 16 символов"})
    password: string
}