import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ResumesModel} from "../resume.model";

interface CoursesAddAttrs {
    profession: string
    education_institution: string
    year_of_ending: string
    resumeId: number
}

@Table({tableName: 'courses'})
export class CoursesModel extends Model<CoursesModel, CoursesAddAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    profession: string

    @Column({type: DataType.STRING, allowNull: false})
    education_institution: string

    @Column({type: DataType.STRING, allowNull: false})
    year_of_ending: string

    @ForeignKey(() => ResumesModel)
    resumeId: number

    @BelongsTo(() => ResumesModel)
    resume: ResumesModel
}