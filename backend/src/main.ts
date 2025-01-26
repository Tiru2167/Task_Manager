import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors = require('cors');
  app.use(cors());

  // Use global ValidationPipe with transform enabled
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Ensure DTO transformation
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(4000);
}
bootstrap();
