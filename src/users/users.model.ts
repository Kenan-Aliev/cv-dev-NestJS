import {Column, Model, Table, DataType, HasOne} from 'sequelize-typescript';
import {TokensModel} from "../tokens/tokens.model";
import {ResumesModel} from "../resume/resume.model";
import {ApiProperty} from "@nestjs/swagger";


interface UserCreationAttrs {
    email: string
    activationLink: string
    isCompany?: boolean
    username: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({uniqueItems: true})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({uniqueItems: true})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;


    @ApiProperty({uniqueItems: true})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string


    @ApiProperty({uniqueItems: true})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    activationLink: string;

    @ApiProperty()
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isActivated: boolean;


    @ApiProperty()
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isCompany: boolean

    @ApiProperty({description: 'Год основания компании,если пользователь является компанией', required: false})
    @Column({type: DataType.INTEGER, allowNull: true})
    foundationYear: number

    @ApiProperty({description: 'Число сотрудников компании', required: false})
    @Column({type: DataType.INTEGER, allowNull: true})
    employeesCount: number

    @ApiProperty()
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasOne(() => TokensModel)
    token: TokensModel

    @HasOne(() => ResumesModel)
    resume: ResumesModel
}