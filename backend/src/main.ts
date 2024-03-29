import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientKnownRequestFilter } from './prisma-client-known-request.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalFilters(new PrismaClientKnownRequestFilter());
    await app.listen(3000);
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1); // Exit the process with a non-zero status code
  }
}

bootstrap();
