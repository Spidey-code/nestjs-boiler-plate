import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CONSTANT } from './constants/constants';
import { ResponseInterceptor } from './interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle(CONSTANT.SWAGGER.TITLE)
    .setDescription(CONSTANT.SWAGGER.DESCRIPTION)
    .setVersion(CONSTANT.SWAGGER.VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(CONSTANT.SWAGGER.DOCS_PATH, app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
