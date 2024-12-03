import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chatMessage')
  handleChatMessage(@MessageBody() data: string): void {
    console.log(`Chat message received: ${data}`);
    this.server.emit('chatResponse', `Chat received: ${data}`);
  }
}
