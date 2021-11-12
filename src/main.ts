import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes( new ValidationPipe({
    // Ignora atributos que no están definidos en el DTO
    whitelist: true,
    // Alertar sobre la propiedad que no está definida en el DTO
    forbidNonWhitelisted: true
  }) );

  app.setGlobalPrefix('api');

  await app.listen(AppModule.port);
}
bootstrap();
