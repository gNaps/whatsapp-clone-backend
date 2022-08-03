import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number): Promise<any> {
    const result = await this.prisma
      .$queryRaw`select M."userId" as ID, U."name" as Name, M."chatId" as Chat
    from "Member" as M
    left join "User" as U on U.id = M."userId"
    where M."chatId" in (SELECT "chatId" FROM "Member" where "userId" = ${userId}) and M."userId" <> ${userId}`;
    return result;
  }

  async findOne(chatId: number): Promise<any> {
    const result = this.prisma.message.findMany({
      where: {
        chatId: {
          equals: chatId,
        },
      },
    });
    return result;
  }

  async create(message: Message): Promise<any> {
    await this.prisma.message.create({
      data: { ...message },
    });
  }
}
