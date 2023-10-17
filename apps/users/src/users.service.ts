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
    return user
  }

  async update(id: number, user: User): Promise<void> {
    await this.UserRepository.update(user, { where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.UserRepository.findAll();
  }
}