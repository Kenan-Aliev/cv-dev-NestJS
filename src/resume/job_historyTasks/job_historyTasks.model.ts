import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {JobHistoryModel} from "../job_history/job-history.model";

interface Job_HistoryTasksAddAttrs {
    [key: string]: string | number

}

@Table({tableName: 'job_historyTasks'})
export class Job_historyTasksModel extends Model<Job_historyTasksModel, Job_HistoryTasksAddAttrs> {
    @ApiProperty()
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @ApiProperty()
    @Column({type: DataType.STRING})
    field1: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field2: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field3: string


    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field4: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field5: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field6: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field7: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field8: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field9: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: true})
    field10: string

    @ApiProperty()
    @ForeignKey(() => JobHistoryModel)
    jobHistoryId: number

}

