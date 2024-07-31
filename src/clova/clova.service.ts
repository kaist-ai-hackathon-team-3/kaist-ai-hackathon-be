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
    let chatRoom = await this.prisma.chatRoom.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!chatRoom) {
      chatRoom = await this.prisma.chatRoom.create({
        data: {
          userId,
        },
      });
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

  async getConversations(userId: number): Promise<number[]> {
    const chatRooms = await this.prisma.chatRoom.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    return chatRooms.map((room) => room.id);
  }

  async getNextChatRoomId(userId: number): Promise<any> {
    const newChatRoom = await this.prisma.chatRoom.create({
      data: {
        userId,
      },
    });

    return { newChatRoomId: newChatRoom.id };
  }

  async getChatRoomConversations(roomId: number): Promise<any[]> {
    return this.prisma.conversation.findMany({
      where: {
        chatRooms: {
          some: {
            chatRoomId: roomId,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        chatRooms: true,
      },
    });
  }

  async summarizeOldestConversation(chatRoomId: number): Promise<string> {
    const oldestConversation = await this.prisma.conversation.findFirst({
      where: {
        chatRooms: {
          some: {
            chatRoomId: chatRoomId,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        messages: true,
      },
    });

    const postMessage = {
      messages: `다음 내용을 제목 형식으로 요약해줘. 너가 지금 주는 답변 그대로 내가 제목으로 쓸 거기 때문에 반드시 다른 어떤 말도 하지 말고 그냥 요약문 딱 하나만 줘. 다음은 대화 내역이야. ${oldestConversation.messages}`,
    };

    const summary = await this.postchat(postMessage);
    return summary;
  }
}
