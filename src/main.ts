import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from 'nestjs-config';
import { AppModule } from './app.module';
import { QueryMenExceptionFilter } from './lib/queryMen/queryMenInterceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalFilters(new QueryMenExceptionFilter());
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  if (appConfig.development) {
    const config = new DocumentBuilder()
      .setTitle('machine test')
      .setDescription('machine test API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }

  await app.listen(appConfig.port);

  console.log(`server listening on port ${appConfig.port}`);
}

bootstrap();
