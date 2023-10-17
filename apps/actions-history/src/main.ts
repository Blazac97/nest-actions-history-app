import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ActionsHistoryModule } from './actions-history.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ActionsHistoryModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'actions_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen();
}
bootstrap();