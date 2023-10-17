import { Module } from '@nestjs/common';
import { ActionsHistoryController } from './actions-history.controller';
import { ActionsHistoryService } from './actions-history.service';

@Module({
  imports: [],
  controllers: [ActionsHistoryController],
  providers: [ActionsHistoryService],
})
export class ActionsHistoryModule {}
