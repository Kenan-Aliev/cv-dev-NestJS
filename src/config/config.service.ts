import {Injectable} from '@nestjs/common';
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class ConfigService {
    private readonly envConfig
    private readonly envFile

    constructor() {
        this.envFile = process.env.NODE_ENV === 'production' ? '.prod.env' : '.env'
        this.envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', `${this.envFile}`)))
    }

    get jwtSecret(): string {
        return this.envConfig.JWT_SECRET
    }

    get emailHost(): string {
        return this.envConfig.EMAIL_HOST
    }

    get emailPort(): number {
        return +this.envConfig.EMAIL_PORT
    }

    get emailID(): string {
        return this.envConfig.EMAIL_ID
    }

    get emailPASS(): string {
        return this.envConfig.EMAIL_PASS
    }
}

