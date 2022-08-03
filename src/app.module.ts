import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { PrismaService } from './prisma.service';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService, PrismaService, MessageGateway],
})
export class AppModule {}
