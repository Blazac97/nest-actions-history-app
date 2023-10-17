import { Module } from '@nestjs/common';
import { ActionsHistoryController } from './actions-history.controller';
import { ActionsHistoryService } from './actions-history.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Action } from './actions.model';

@Module({
  imports: [ConfigModule.forRoot({
      envFilePath: '.env'
    }),SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Action],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Action])],
  controllers: [ActionsHistoryController],
  providers: [ActionsHistoryService],
})
export class ActionsHistoryModule {}
