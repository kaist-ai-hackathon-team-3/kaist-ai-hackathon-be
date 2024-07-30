import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClovaService } from './clova.service';
import { ClovaController } from './clova.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [ClovaService],
  controllers: [ClovaController],
})
export class ClovaModule {}
