import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";
import {DirectionModel} from "../directions/directions.model";

interface VacancyAddAttrs {
    title: string
    directionId: number
    companyId: number
}

@Table({tableName: 'vacancies'})
export class VacancyModel extends Model<VacancyModel, VacancyAddAttrs> {
    @ApiProperty()
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @ApiProperty()
    @Column({type: DataType.DATE, defaultValue: Date.now()})
    createdAt: Date

    @ApiProperty()
    @ForeignKey(() => DirectionModel)
    directionId: DirectionModel


    @ApiProperty()
    @ForeignKey(() => User)
    companyId: number


    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => DirectionModel)
    direction: DirectionModel

}