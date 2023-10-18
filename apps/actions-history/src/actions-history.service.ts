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
    return user;
  }

  async search(userId: number, options?: { take?: number; page?: number }) {
    const { take, page } = options || {};
    if (take !== undefined && page !== undefined) {
      let skip = page * take - take;
      if (skip < 0) {
        skip = 0;
      }
      const { rows: data, count: totalItems } =
        await this.ActionRepository.findAndCountAll({
          where: {
            userId,
          },
          limit: take,
          offset: skip,
        });
      const totalPages = Math.ceil(totalItems / take);
      return {
        data,
        pagination: {
          take,
          skip,
          totalItems,
          totalPages,
          currentPage: page,
        },
      };
    }
    return this.ActionRepository.findAll({ where: { userId } });
  }
}
