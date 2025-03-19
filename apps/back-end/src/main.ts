/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
  Logger.log(`🚀 API: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🚀 OpenAPI Docs: http://localhost:${port}/${globalPrefix}-docs`);
  Logger.log(
    `🚀 OpenAPI JSON: http://localhost:${port}/${globalPrefix}-docs-json`
  );
}

bootstrap().then(() =>
  console.log(`Application is running on: http://localhost:${port}`)
);
