import { Module } from '@nestjs/common';
import { SocketIoGateway } from './socketio/socketio.gateway';

@Module({
  providers: [SocketIoGateway],
  exports: [SocketIoGateway],
})
export class EventsModule {}
