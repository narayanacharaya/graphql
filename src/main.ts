import 'reflect-metadata'; // Required for decorators
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Import the correct module

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Server running at http://localhost:3000/graphql');
}

bootstrap();
