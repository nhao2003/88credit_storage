import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './core/configs/docs/swagger.config';
import { ConfigService } from '@nestjs/config';
import EnvConstants from './common/constants/env.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig.config(app);
  const config = app.get(ConfigService);
  await app.listen(config.get(EnvConstants.PORT));
}
bootstrap();
