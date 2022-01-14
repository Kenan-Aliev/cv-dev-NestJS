import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateDirectionDto {
    @ApiProperty()
    @IsString({message: 'Должно быть строкой'})
    direction_name: string
}