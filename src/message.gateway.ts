import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message } from '@prisma/client';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: string): Promise<any> {
    const message: Message = JSON.parse(payload);
    await this.chatService.create(message);
    this.server.emit('recMessage', payload);
  }
}
