import { Logger } from '@nestjs/common';
import { get } from 'lodash';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ResponseWebhook } from '@core/entities/pagarme/response-webhook';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketIoGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger(SocketIoGateway.name);

  public afterInit(): void {
    return this.logger.log('Init');
  }

  async orderProcessed(@MessageBody() data: ResponseWebhook) {
    const userEmail = get(data, 'data.customer.email');

    this.server.to(userEmail).emit('orderProcessed', data);
  }

  @SubscribeMessage('joinOrderRoom')
  public joinOrderRoom(client: Socket, room: string): void {
    this.logger.log(`joinOrderRoom: ${room}`);
    client.join(room);
  }

  @SubscribeMessage('leaveOrderRoom')
  public leaveOrderRoom(client: Socket, room: string): void {
    this.logger.log(`leaveOrderRoom: ${room}`);
    client.leave(room);
  }
}
