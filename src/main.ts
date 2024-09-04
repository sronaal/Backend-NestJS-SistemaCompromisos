/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.enableCors({origin:'*'})
  app.setGlobalPrefix('/api/v2')


  


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    })
  )

  const config = new DocumentBuilder()
  .setTitle('Suite Backend v2')
  .setVersion('2.0')
  .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('document',app, document)


  await app.listen(3000);
}
bootstrap();
