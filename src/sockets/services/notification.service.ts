import { Injectable } from '@nestjs/common';
import { AppGateway } from '../gateways/app.gateway';
import { SOCKET_EVENTS } from '../events.types';
@Injectable()
export class NotificationService {
  constructor(private gateway: AppGateway) {}

  sendNotification(message: string, evnetTye: keyof typeof SOCKET_EVENTS) {
    this.gateway.server.emit(SOCKET_EVENTS[evnetTye], message);
  }

  sendRoomNotification(
    room: string,
    message: string,
    evnetTye: keyof typeof SOCKET_EVENTS,
  ) {
    this.gateway.server.to(room).emit(SOCKET_EVENTS[evnetTye], message);
  }
}
