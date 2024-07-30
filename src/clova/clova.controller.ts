import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
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
@UseGuards(JwtAuthGuard)
export class ClovaController {
  constructor(private clovaService: ClovaService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('chat')
  @ApiOperation({ summary: 'Send a message to the Clova chat service' })
  @ApiBody({
    description: 'Payload containing the chat message data',
    schema: {
      example: {
        messages: 'Hello, Clova!',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Response from the Clova chat service',
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
    const response = await this.clovaService.postchat(data, userId);
    await this.clovaService.saveConversation(data, response, userId);
    return response;
  }
  // async chat(@Req() req, @Body() data: any): Promise<any> {
  //   console.log(req.user);
  //   const userId = req.user.id;
  //   const response = await this.clovaService.postchat(data, userId);
  //   await this.clovaService.saveConversation(data, response, userId);
  //   return response;
  // }

  @UseGuards(JwtAuthGuard)
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
    return this.clovaService.getConversations(userId);
  }
}
