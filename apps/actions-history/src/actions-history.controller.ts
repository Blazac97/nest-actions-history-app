import { Controller } from '@nestjs/common';
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
  async searchActions(
    @Payload() data: { userId: number; page?: number; take?: number },
  ) {
    const { userId, take, page } = data;
    return await this.actionsHistoryService.search(userId, { take, page });
  }
}
