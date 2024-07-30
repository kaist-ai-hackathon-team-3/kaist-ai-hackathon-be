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

  async postchat(data: any, userId: number): Promise<any> {
    const newData = {
      messages: [
        {
          content: data.messages,
          role: 'user',
        },
      ],
    };

    // console.log(process.env.X_NCP_CLOVASTUDIO_API_KEY);
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
    await this.prisma.conversation.create({
      data: {
        userId,
        messages: JSON.stringify([
          { role: 'user', content: data.messages },
          { role: 'assistant', content: response.content },
        ]),
      },
    });
  }

  async getConversations(userIdStr: string): Promise<any[]> {
    const userId = Number(userIdStr);
    return this.prisma.conversation.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }, // 최신 대화가 먼저 보이도록 정렬
    });
  }
}
