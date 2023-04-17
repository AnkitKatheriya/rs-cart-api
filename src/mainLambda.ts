import { configure as serverlessExpress } from '@vendia/serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { Context } from 'aws-lambda'

import { AppModule } from './app.module';

let cachedServer;

export const handler = async (event, context: Context) => {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('Cart service')
      .setDescription('The cart API description')
      .setVersion('1.0')
      .addTag('cart')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();
    cachedServer = serverlessExpress({
      app: app.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};