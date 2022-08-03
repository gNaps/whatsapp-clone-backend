import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<any> {
    const { userId } = request.query;
    return await this.chatService.findAll(+userId);
  }

  @Get(':id')
  async findOne(
    @Req() request: Request,
    @Param('id') chatId: number,
  ): Promise<any> {
    const { userId } = request.query;
    const messages = await this.chatService.findOne(+chatId);
    return messages.map((m) => ({ ...m, owner: m.userId === +userId }));
  }
}
