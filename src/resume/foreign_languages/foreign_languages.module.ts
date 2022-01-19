import {Module} from "@nestjs/common";
import {ResumesModel} from "../resume.model";
import {Foreign_languagesModel} from "./foreign_languages.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Foreign_languagesService} from "./foreign_languages.service";

@Module({
    imports: [SequelizeModule.forFeature([ResumesModel, Foreign_languagesModel])],
    providers: [Foreign_languagesService],
    exports: [Foreign_languagesService]
})

export class Foreign_languagesModule {
}