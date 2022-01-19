import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ResumesModel} from "../resume.model";
import {DirectionModel} from "../../directions/directions.model";

interface JobHistoryAddAttrs {
    from: string
    to: string
    organization: string
    responsibilities: string
    directionId: number
    resumeId: number
}

@Table({tableName: 'jobHistories'})
export class JobHistoryModel extends Model<JobHistoryModel, JobHistoryAddAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    organization: string

    @Column({type: DataType.STRING, allowNull: false})
    from: string

    @Column({type: DataType.STRING, allowNull: false})
    to: string

    @Column({type: DataType.STRING, allowNull: false})
    responsibilities: string


    @ForeignKey(() => ResumesModel)
    resumeId: number

    @BelongsTo(() => ResumesModel)
    resume: ResumesModel


    @ForeignKey(() => DirectionModel)
    directionId: number

    @BelongsTo(() => DirectionModel)
    direction: DirectionModel
}