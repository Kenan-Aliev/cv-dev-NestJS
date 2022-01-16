import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ResumesModel} from "../resume.model";
import {DirectionModel} from "../../directions/directions.model";
import {Job_historyTasksModel} from "../job_historyTasks/job_historyTasks.model";

interface JobHistoryAddAttrs {
    start_date: Date
    end_date: Date
    company_name: string
    directionId: number
    resumeId: number
}

@Table({tableName: 'jobHistories'})
export class JobHistoryModel extends Model<JobHistoryModel, JobHistoryAddAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    company_name: string

    @Column({type: DataType.DATE, allowNull: false})
    start_date: Date

    @Column({type: DataType.DATE, allowNull: false})
    end_date: Date | string

    @ForeignKey(() => ResumesModel)
    resumeId: number

    @BelongsTo(() => ResumesModel)
    resume: ResumesModel


    @ForeignKey(() => DirectionModel)
    directionId: number

    @BelongsTo(() => DirectionModel)
    direction: DirectionModel


    @HasOne(() => Job_historyTasksModel)
    job_historyTasks: Job_historyTasksModel
}