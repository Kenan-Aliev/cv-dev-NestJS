import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5000

async function start() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({credentials: true})
    await app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`)
    });
}

start();
