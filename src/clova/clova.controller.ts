import { Controller, Post } from '@nestjs/common';

@Controller('clova')
export class ClovaController {
  @Post('chat')
  chat(): string {
    
  }
}
