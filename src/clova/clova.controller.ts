import { Body, Controller, Post } from '@nestjs/common';
import { ClovaService } from './clova.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Clova')
@Controller('clova')
export class ClovaController {
  constructor(private clovaService: ClovaService) {}

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
        reply: 'Hello! How can I assist you today?',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  chat(@Body() data: any): Promise<any> {
    return this.clovaService.postchat(data);
  }
}
