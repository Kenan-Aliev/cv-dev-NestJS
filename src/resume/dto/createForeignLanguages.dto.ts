import {ApiProperty} from "@nestjs/swagger";

export class CreateForeignLanguagesDto {
    @ApiProperty()
    language: string

    @ApiProperty()
    level: string
}