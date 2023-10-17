import { Controller, Get } from '@nestjs/common';
import { ActionsHistoryService } from './actions-history.service';

@Controller()
export class ActionsHistoryController {
  constructor(private readonly actionsHistoryService: ActionsHistoryService) {}

  @Get()
  getHello(): string {
    return this.actionsHistoryService.getHello();
  }
}
