import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ExceptionsFilterLogger } from './utils/exceptionsLogger.filter';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const {httpAdapter} = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ExceptionsFilterLogger(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  // Serialize the app(Transform response data before returning it to the user). Nest comes  equipped with ClassSerializerInterceptor which uses class-transformer under the hood.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Read cookies easily
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
