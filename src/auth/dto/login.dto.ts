import {IsBoolean, IsEmail, IsString, Length} from "class-validator";

export class LoginDto {
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: 'Некорректный email'})
    email: string


    @IsString({message: "Должно быть строкой"})
    @Length(4, 16, {message: "Должно быть минимум 4 и максимум 16 символов"})
    password: string
}