import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Action } from './actions.model';

@Injectable()
export class ActionsHistoryService {
  constructor(
    @InjectModel(Action)
    private ActionRepository: typeof Action,
  ) {}

  async create(dto) {
    const user = await this.ActionRepository.create(dto);
    return user
  }

  async search(userId:number) {
    return this.ActionRepository.findAll({where:{userId}})

  }
}
