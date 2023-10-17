import { Controller, Get } from '@nestjs/common';
import { ActionsHistoryService } from './actions-history.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActionDTO } from './dto/actionDTO';

@Controller()
export class ActionsHistoryController {
  constructor(private readonly actionsHistoryService: ActionsHistoryService) {}

  @MessagePattern('createAction')
  async createAction(@Payload() dto: ActionDTO) {
    return await this.actionsHistoryService.create(dto);
  }

  @MessagePattern('searchActions')
  async searchActions(@Payload() data:{userId:number}) {
    return await this.actionsHistoryService.search(data.userId);
  }
}
