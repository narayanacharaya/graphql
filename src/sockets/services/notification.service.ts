import { Injectable } from '@nestjs/common';
import { AppGateway } from '../gateways/app.gateway';

@Injectable()
export class NotificationService {
  constructor(private gateway: AppGateway) {}

  sendNotification(message: string) {
    this.gateway.server.emit('notification', message);
  }

  sendRoomNotification(room: string, message: string) {
    this.gateway.server.to(room).emit('notification', message);
  }
}
