import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Bật CORS cho tất cả domain (tạm thời)
  app.enableCors({
    origin: '*', // <-- CHO PHÉP MỌI NGUỒN (có thể giới hạn sau)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ✅ Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformResponseInterceptor());

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
