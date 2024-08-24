import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { appSecrets } from '@config/secrets';
const { APP_PORT } = appSecrets;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.listen(APP_PORT, '::', () => {
    logger.log(`Imagine app is running on ${APP_PORT} port`);
  });
}
bootstrap();
