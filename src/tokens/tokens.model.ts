import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface TokensAddAttrs {
    value: string
    userId: number
}

@Table({tableName: 'tokens'})
export class TokensModel extends Model<TokensModel, TokensAddAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    value: string

    @ForeignKey(() => User)
    userId: number

    @BelongsTo(() => User)
    user: User
}