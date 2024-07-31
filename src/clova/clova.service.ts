import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Prisma 서비스 추가
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { JsonValue } from '@prisma/client/runtime/library';

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
    roomId: number,
  ): Promise<void> {
    // 기존 채팅방 찾기
    let chatRoom = await this.prisma.chatRoom.findFirst({
      where: { id: roomId },
    });

    if (!chatRoom) {
      throw new Error(`Chat Room with id ${roomId} not found`);
    }

    // 기존 대화 기록 가져오기
    const previousConversations = await this.prisma.conversation.findMany({
      where: {
        chatRooms: {
          some: {
            chatRoomId: roomId,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // 기존 대화 메시지 배열로 변환
    let updatedMessages: { role: string; content: string }[] = [];

    previousConversations.forEach((conv) => {
      if (isValidJsonString(conv.messages.toString())) {
        const messages = parseMessages(conv.messages.toString());
        if (Array.isArray(messages)) {
          updatedMessages = [...updatedMessages, ...messages];
        } else {
          console.error('Parsed messages is not an array:', messages);
        }
      } else {
        console.error('Invalid JSON format:', conv.messages);
      }
    });

    // 새로운 메시지 추가
    updatedMessages.push(
      { role: 'user', content: data.messages },
      { role: 'assistant', content: response.content },
    );

    // 대화 저장
    // 예시: 저장 시 JSON 문자열로 변환
    await this.prisma.conversation.create({
      data: {
        messages: JSON.stringify(updatedMessages), // 배열을 JSON 문자열로 저장
        chatRooms: {
          create: {
            chatRoomId: roomId,
          },
        },
      },
    });
  }

  async getConversations(
    userId: number,
  ): Promise<{ id: number; roomTitle: string }[]> {
    const chatRooms = await this.prisma.chatRoom.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        roomTitle: true,
      },
    });

    return chatRooms.map((room) => ({
      id: room.id,
      roomTitle: room.roomTitle,
    }));
  }

  async getNextChatRoomId(userId: number, profileId: number): Promise<any> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
    });

    if (!profile) {
      throw new Error(`Profile with id ${profileId} not found`);
    }

    const newChatRoom = await this.prisma.chatRoom.create({
      data: {
        userId,
        profileId,
        roomTitle: '',
      },
    });

    const postMessage = {
      messages: `내가 사는 곳: ${profile.region}, 나의 성별: ${profile.gender}, 나의 나이: ${profile.age}, 나의 occupation: ${profile.occupation}, 우리 집 가족 구성원 수: ${profile.householdSize}, 우리 집 소득: ${profile.householdIncome}만 원, 나의 특이사항: ${profile.targetFeature}이야. 앞으로 대화가 끝나기 전까지 나의 정보를 절대 까먹지 말고 꼭 기억하고 앞으로의 질문에 답변해 줘. 명심해.`,
    };

    const summaryResponse = await this.postchat(postMessage);
    await this.saveConversation(
      postMessage,
      summaryResponse,
      userId,
      profileId,
    );

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

    const summaryResponse = await this.postchat(postMessage);
    const summaryContent = summaryResponse.content;

    // 채팅룸의 제목을 업데이트합니다.
    await this.prisma.chatRoom.update({
      where: {
        id: chatRoomId,
      },
      data: {
        roomTitle: summaryContent,
      },
    });

    // 업데이트된 제목을 반환합니다.
    return summaryContent;
  }
}
function parseMessages(messages: string): any[] {
  try {
    return JSON.parse(messages);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return [];
  }
}

function isValidJsonString(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
