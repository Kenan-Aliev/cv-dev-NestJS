import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {JobHistoryModel} from "./job_history/job-history.model";
import {ApiProperty} from "@nestjs/swagger";
import {Foreign_languagesModel} from "./foreign_languages/foreign_languages.model";
import {CoursesModel} from "./courses/courses.model";

interface ResumeAddAttrs {
    name: string
    surname: string
    patronymic: string
    phone: string
    city: string
    email: string
    birthday: string
    sphere: string
    github: string
    wished_salary: string
    busyness: string
    description: string
    userId: number
}

@Table({tableName: 'resumes'})
export class ResumesModel extends Model<ResumesModel, ResumeAddAttrs> {
    @ApiProperty()
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    name: string


    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    surname: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    patronymic: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    phone: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    sphere: string


    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    city: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    email: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    birthday: string


    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    github: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    wished_salary: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    busyness: string

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @ApiProperty()
    @ForeignKey(() => User)
    userId: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => JobHistoryModel)
    jobHistory: JobHistoryModel[]

    @HasMany(() => Foreign_languagesModel)
    foreignLanguages: Foreign_languagesModel[]

    @HasMany(() => CoursesModel)
    courses: CoursesModel[]
}