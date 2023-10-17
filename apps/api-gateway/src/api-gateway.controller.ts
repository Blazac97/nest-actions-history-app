import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserDTO } from 'apps/users/src/dto/userDTO';

@Controller()
export class ApiGatewayController {
    private clientUsers: ClientProxy;
    private clientActions: ClientProxy;

  constructor(private readonly apiGatewayService: ApiGatewayService) {
    this.clientUsers = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ["amqp://rabbitmq:5672"],
                queue: "users_queue",
                queueOptions: {
                    durable: false
                }
            }
        });
      
    this.clientActions = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ["amqp://rabbitmq:5672"],
                queue: "actions_queue",
                queueOptions: {
                    durable: false
                }
            }
        });   
      }

async onModuleInit() {
        await this.clientUsers.connect();
        await this.clientActions.connect();
    }

  @Post("/user")
    async createUser(@Body() dto: UserDTO) {
        const data = await this.clientUsers.send("createUser", dto).toPromise();
        return {User:data};
    }
}
