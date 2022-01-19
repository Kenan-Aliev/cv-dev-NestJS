import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ResumesModel} from "../resume.model";

interface ForeignLanguagesAddAttrs {
    language: string
    level: string
    resumeId: number
}

@Table({tableName: 'foreignLanguages'})
export class Foreign_languagesModel extends Model<Foreign_languagesModel, ForeignLanguagesAddAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    language: string

    @Column({type: DataType.STRING, allowNull: false})
    level: string

    @ForeignKey(() => ResumesModel)
    resumeId: number

    @BelongsTo(() => ResumesModel)
    resume: ResumesModel


}