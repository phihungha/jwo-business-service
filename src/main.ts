import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.get<string>('KAFKA_CLIENT_ID'),
        brokers: [
          configService.get<string>('KAFKA_BROKER_HOST', 'localhost:9092'),
        ],
        connectionTimeout: configService.get<number>(
          'KAFKA_CONN_TIMEOUT',
          5000,
        ),
        retry: {
          retries: configService.get<number>('KAFKA_MAX_RETRY', 5),
        },
      },
      consumer: {
        groupId: configService.get<string>(
          'KAFKA_CONSUMER_GROUP_ID',
          'business-service',
        ),
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('SERVICE_PORT', 5000));
}

bootstrap();
