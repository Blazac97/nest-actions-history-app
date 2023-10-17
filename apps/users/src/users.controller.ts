import { Controller, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { Payload,MessagePattern } from '@nestjs/microservices';
import { UserDTO } from './dto/userDTO';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @MessagePattern('createUser')
  async createUser(@Payload() dto: UserDTO) {
    return await this.usersService.create(dto);
  }

  @MessagePattern('updateUser')
  async updateUser(@Payload() data: { id: number, dto: UserDTO }) {
    const {id, dto} = data;
    return await this.usersService.update(id,dto);
  }

  @MessagePattern('getAllUsers')
  async getAllUsers() {
    return await this.usersService.findAll();
  }
}
