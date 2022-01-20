import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'

const PORT = Number(process.env.PORT) || 5000

async function start() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors(
        {
            credentials: true,
            // origin: process.env.CLIENT_URL
        }
    )
    const config = new DocumentBuilder()
        .setTitle('CV-DEV API')
        .setDescription('Cv-Dev Api Documentation')
        .setVersion('1.0')
        .addTag('API')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
    await app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`)
    });
}

start();
