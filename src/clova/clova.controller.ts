import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
    const userId = 1;
    const response = await this.clovaService.postchat(data);
    await this.clovaService.saveConversation(data, response, +userId);
    return response;
  }

  @Get('conversations/:userId')
  @ApiOperation({ summary: 'Get all conversations for a user' })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user whose conversations are to be retrieved',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of conversations for the user',
    schema: {
      example: [
        {
          id: 1,
          userId: 1,
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
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getConversations(@Param('userId') userId: string): Promise<any[]> {
    return this.clovaService.getConversations(parseInt(userId));
  }

  @Get('newChatRoom')
  @ApiOperation({ summary: '대화 시작할 때 새로운 방 번호 부여' })
  @ApiResponse({
    status: 200,
    description: 'The new chat room ID incremented by 1',
    schema: {
      example: {
        newChatRoomId: 2,
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getNextChatRoomId(): Promise<any> {
    return this.clovaService.getNextChatRoomId();
  }
}
