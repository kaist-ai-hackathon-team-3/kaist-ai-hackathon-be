import { Body, Controller, Post } from '@nestjs/common';
import { ClovaService } from './clova.service';

@Controller('clova')
export class ClovaController {
  constructor(private clovaService: ClovaService) {}
  @Post('chat')
  chat(@Body() data: any): Promise<any> {
    return this.clovaService.postchat(data);
  }
}
