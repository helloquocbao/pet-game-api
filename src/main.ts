import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Global Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Virtual Pet API')
    .setDescription('API cho game thú ảo mini')
    .setVersion('1.0')
    .addBearerAuth() // nếu sau này dùng JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:4200/api

  // ✅ Start server
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Failed to start app', err);
});
