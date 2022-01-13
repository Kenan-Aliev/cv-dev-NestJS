import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {JobHistoryModel} from "../resume/job_history/job-history.model";

interface DirectionAddAttrs {
    direction_name: string
}

@Table({tableName: 'directions'})
export class DirectionModel extends Model<DirectionModel, DirectionAddAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    direction_name: string

    @HasMany(() => JobHistoryModel)
    jobHistoryModels: JobHistoryModel[]
}