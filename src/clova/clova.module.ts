import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClovaService } from './clova.service';
import { ClovaController } from './clova.controller';

@Module({
  imports: [HttpModule],
  providers: [ClovaService],
  controllers: [ClovaController],
})
export class ClovaModule {}
