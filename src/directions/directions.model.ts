import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {VacancyModel} from "../vacancy/vacancy.model";

interface DirectionAddAttrs {
    direction_name: string
}

@Table({tableName: 'directions'})
export class DirectionModel extends Model<DirectionModel, DirectionAddAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    direction_name: string

    @HasMany(() => VacancyModel)
    vacancies: VacancyModel[]
}