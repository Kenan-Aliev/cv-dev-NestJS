import {Column, Model, Table, DataType, HasOne} from 'sequelize-typescript';
import {TokensModel} from "../tokens/tokens.model";
import {ResumesModel} from "../resume/resume.model";

interface UserCreationAttrs {
    email: string
    activationLink: string
    isCompany?: boolean
    username: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number


    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    activationLink: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isActivated: boolean;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isCompany: boolean

    @Column({type: DataType.INTEGER, allowNull: true})
    foundationYear: number

    @Column({type: DataType.INTEGER, allowNull: true})
    employeesCount: number

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasOne(() => TokensModel)
    token: TokensModel

    @HasOne(() => ResumesModel)
    resume: ResumesModel
}