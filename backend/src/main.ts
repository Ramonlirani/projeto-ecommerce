import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { json, urlencoded } from 'express';
import { env } from './env';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sentry.init({
  //   dsn: env.SENTRY_DNS,
  //   tracesSampleRate: 1.0,
  // });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: '*',
  });

  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));

  await app.listen(env.PORT);
}
bootstrap();
