import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClovaService } from './clova.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Clova')
@Controller('clova')
export class ClovaController {
  constructor(private clovaService: ClovaService) {}

  @Post('chat')
  @ApiOperation({ summary: '클로버 AI에게 대화 전달' })
  @ApiBody({
    description: '채팅 messages를 담고 있는 객체',
    schema: {
      example: {
        messages: 'Hello, Clova!',
        roomId: 1, // profileId 대신 roomId 추가
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '클로버 AI가 전달한 답장',
    schema: {
      example: {
        content: 'Hello! How can I assist you today?',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async chat(@Body() data: any): Promise<any> {
    const userId = 1; // 실제로는 인증된 사용자 ID를 받아와야 합니다.
    const { roomId } = data; // profileId 대신 roomId를 받음
    const response = await this.clovaService.postchat(data);
    await this.clovaService.saveConversation(data, response, userId, roomId);
    return response;
  }

  @Get('rooms/:userId')
  @ApiOperation({
    summary: 'Get all chat rooms with IDs and titles for a user',
  })
  @ApiParam({
    name: 'userId',
    description:
      'ID of the user whose chat room IDs and titles are to be retrieved',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of chat rooms with IDs and titles for the user',
    schema: {
      example: [
        { id: 1, roomTitle: 'Chat Room 1' },
        { id: 2, roomTitle: 'Chat Room 2' },
      ], // Example array of chat rooms with IDs and titles
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getConversations(
    @Param('userId') userId: string,
  ): Promise<{ id: number; roomTitle: string }[]> {
    return this.clovaService.getConversations(parseInt(userId));
  }

  @Get('newChatRoom/:userId/:profileId')
  @ApiOperation({ summary: '대화 시작할 때 새로운 방 번호 부여' })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user who is starting a new chat room',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The new chat room ID',
    schema: {
      example: {
        newChatRoomId: 2,
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getNextChatRoomId(
    @Param('userId') userId: string,
    @Param('profileId') profileId: string,
  ): Promise<any> {
    return this.clovaService.getNextChatRoomId(
      parseInt(userId),
      parseInt(profileId),
    );
  }

  @Get('chatroom/:roomId')
  @ApiOperation({ summary: 'Get all conversations for a chat room' })
  @ApiParam({
    name: 'roomId',
    description: 'ID of the chat room whose conversations are to be retrieved',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of conversations for the chat room',
    schema: {
      example: [
        {
          id: 1,
          chatRoomId: 1,
          messages: [
            { role: 'user', content: 'Hello!' },
            { role: 'assistant', content: 'Hi there!' },
          ],
          createdAt: '2024-07-30T00:00:00.000Z',
          updatedAt: '2024-07-30T00:00:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Chat Room not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getChatRoomConversations(
    @Param('roomId') roomId: string,
  ): Promise<any[]> {
    return this.clovaService.getChatRoomConversations(parseInt(roomId));
  }

  @Get('chatroom/:chatRoomId/summary')
  @ApiOperation({
    summary: '첫 대화 기반으로 채팅방 제목 생성',
  })
  @ApiParam({
    name: 'chatRoomId',
    description: 'ID of the chat room',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Summary of the oldest conversation in the chat room',
    schema: {
      example: {
        summary: {
          content: '배고픔 표현에 대한 음식 추천 제안',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getOldestConversationSummary(
    @Param('chatRoomId') chatRoomId: string,
  ): Promise<{ summary: string }> {
    try {
      const summary = await this.clovaService.summarizeOldestConversation(
        parseInt(chatRoomId, 10),
      );
      return { summary };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
