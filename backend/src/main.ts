import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // có truyền thừa dữ liệu giúp loại bỏ -  sẽ bị loại bỏ trước khi handler nhận dữ liệu.
            forbidNonWhitelisted: true // Chặn request nếu có trường dư thừa
        })
    ); // cấu hình middleware
    app.setGlobalPrefix('api/v1', { exclude: [''] }); // set version - cấu hình api/v1

    await app.listen(port);
}
bootstrap();
