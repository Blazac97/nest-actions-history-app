import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { UserDTO } from 'apps/users/src/dto/userDTO';

@Controller()
export class ApiGatewayController {
  private clientUsers: ClientProxy;
  private clientActions: ClientProxy;

  constructor(private readonly apiGatewayService: ApiGatewayService) {
    this.clientUsers = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'users_queue',
        queueOptions: {
          durable: false,
        },
      },
    });

    this.clientActions = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'actions_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async onModuleInit() {
    await this.clientUsers.connect();
    await this.clientActions.connect();
  }

  @Post('/user')
  async createUser(@Body() dto: UserDTO) {
    const data = await this.clientUsers.send('createUser', dto).toPromise();
    await this.clientActions
      .send('createAction', { type: 'create', userId: data.id })
      .toPromise();
    return data;
  }

  @Patch('/user/:id')
  async updateUser(@Param('id') id: number, @Body() dto: UserDTO) {
    const data = await this.clientUsers
      .send('updateUser', { id, dto })
      .toPromise();
    await this.clientActions
      .send('createAction', { type: 'update', userId: id })
      .toPromise();
    return data;
  }

  @Get('/users')
  async getAllUsers() {
    const data = await this.clientUsers.send('getAllUsers', {}).toPromise();
    return data;
  }

  @Get('/actions/search')
  async searchActions(
    @Query('userId') userId: number,
    @Query('take') take: number | undefined,
    @Query('page') page: number | undefined,
  ) {
    const data = await this.clientActions
      .send('searchActions', {
        userId,
        take: take !== undefined ? Number(take) : undefined,
        page: page !== undefined ? Number(page) : undefined,
      })
      .toPromise();
    return data;
  }
}
