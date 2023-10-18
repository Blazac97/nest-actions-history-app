import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private UserRepository: typeof User,
  ) {}

  async create(dto): Promise<User> {
    const user = await this.UserRepository.create(dto);
    return user;
  }

  async update(id: number, user) {
    await this.UserRepository.update(user, { where: { id } });
    return this.UserRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.UserRepository.findAll();
  }
}
