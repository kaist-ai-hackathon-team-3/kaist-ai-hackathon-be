import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('API 문서 제목')
    .setDescription('API 문서 설명')
    .setVersion('1.0')
    .addTag('api-tag') // 태그 추가
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger UI 엔드포인트 설정
  await app.listen(3000);
}
bootstrap();
