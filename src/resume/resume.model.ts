import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {JobHistoryModel} from "./job_history/job-history.model";

interface ResumeAddAttrs {
    userId: number
}

@Table({tableName: 'resumes'})
export class ResumesModel extends Model<ResumesModel, ResumeAddAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @ForeignKey(() => User)
    userId: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => JobHistoryModel)
    jobHistoryModels: JobHistoryModel[]
}