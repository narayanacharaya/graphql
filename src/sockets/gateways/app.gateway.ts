import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
@WebSocketGateway({
  cors: {
    origin: '*',
    transports: ['websocket'],
  },
})
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  server: Server;

  constructor() {
    console.log('WebSocket Gateway Constructor: Gateway instance created.');
  }

  onModuleInit() {
    console.log(
      'WebSocket Gateway Initialized: Server is ready to accept connections.',
    );
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.on('error', (err) => {
      console.error('Socket error:', err);
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log(`Message from ${client.id}: ${data}`);
    return `Server response: ${data}`;
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    this.server.to(room).emit('notification', `User joined room: ${room}`);
  }
}
