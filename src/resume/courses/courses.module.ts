import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ResumesModel} from "../resume.model";
import {CoursesModel} from "./courses.model";
import {CoursesService} from "./courses.service";

@Module({
    imports: [SequelizeModule.forFeature([ResumesModel, CoursesModel])],
    providers: [CoursesService],
    exports: [CoursesService]
})

export class CoursesModule {
}