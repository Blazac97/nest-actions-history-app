import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionsHistoryService {
  getHello(): string {
    return 'Hello World!';
  }
}
