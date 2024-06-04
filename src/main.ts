import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { BaseRpcExceptionFilter, Transport } from '@nestjs/microservices';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import EnvConstants from './common/constants/env.constant';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';
    return throwError(() => new HttpException(message, status));
  }
}
async function bootstrap() {
  const rabbitmqHost = process.env[EnvConstants.RABBITMQ_HOST] ?? 'localhost';
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@' + rabbitmqHost + ':5672'],
      queue: 'storage_queue',
    },
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.listen();
}
bootstrap();
