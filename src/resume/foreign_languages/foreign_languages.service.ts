import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Foreign_languagesModel} from "./foreign_languages.model";
import {CreateForeignLanguagesDto} from "../dto/createForeignLanguages.dto";

@Injectable()
export class Foreign_languagesService {
    constructor(@InjectModel(Foreign_languagesModel) private readonly foreignLanguagesRepository: typeof Foreign_languagesModel) {
    }

    async addForeignLanguage(dto: CreateForeignLanguagesDto, resumeId: number) {
        const foreignLanguage = await this.foreignLanguagesRepository.create({...dto, resumeId})
        return foreignLanguage.id
    }
}