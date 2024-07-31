import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Prisma 서비스 추가
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClovaService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async postchat(data: any): Promise<any> {
    const newData = {
      messages: [
        {
          content: data.messages,
          role: 'user',
        },
      ],
    };

    const headers = {
      'X-NCP-CLOVASTUDIO-API-KEY': this.configService.get<string>(
        'X_NCP_CLOVASTUDIO_API_KEY',
      ),
      'X-NCP-APIGW-API-KEY': this.configService.get<string>(
        'X_NCP_APIGW_API_KEY',
      ),
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003',
          newData,
          { headers },
        ),
      );
      return { content: response.data.result.message.content };
    } catch (error) {
      console.error('Error', error.response?.data || error.message);
      throw error;
    }
  }

  async saveConversation(
    data: any,
    response: any,
    userId: number,
  ): Promise<void> {
    const chatRoom = await this.prisma.chatRoom.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!chatRoom) {
      throw new Error('ChatRoom not found');
    }

    await this.prisma.conversation.create({
      data: {
        messages: JSON.stringify([
          { role: 'user', content: data.messages },
          { role: 'assistant', content: response.content },
        ]),
        chatRooms: {
          create: {
            chatRoomId: chatRoom.id,
          },
        },
      },
    });
  }

  async getConversations(userId: number): Promise<any[]> {
    return this.prisma.conversation.findMany({
      where: {
        chatRooms: {
          some: {
            chatRoom: {
              userId,
            },
          },
        },
      },
      include: {
        chatRooms: true,
      },
    });
  }

  async getNextChatRoomId(): Promise<any> {
    const latestChatRoom = await this.prisma.chatRoom.findFirst({
      orderBy: { roomId: 'desc' },
    });

    const newChatRoomId = latestChatRoom ? latestChatRoom.roomId + 1 : 1;

    return { newChatRoomId };
  }
}
