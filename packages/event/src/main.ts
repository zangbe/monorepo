import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'monorepo-libs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Apply global filters
  app.useGlobalFilters(new HttpExceptionFilter());
  
  app.setGlobalPrefix('event');
  
  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Event Service API')
    .setDescription('API documentation for Event service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Event service running on port ${port}`);
}
bootstrap();
