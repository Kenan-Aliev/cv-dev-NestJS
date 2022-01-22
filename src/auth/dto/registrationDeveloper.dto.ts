import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';

export class RegistrationDeveloperDto {
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
        minLength: 4,
        maxLength: 16
    })
    @IsString({message: "Должно быть строкой"})
    @Length(4, 16, {message: "Должно быть минимум 4 и максимум 16 символов"})
    password: string
}