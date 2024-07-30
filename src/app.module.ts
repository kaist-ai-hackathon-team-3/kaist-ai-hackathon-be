import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ClovaService } from './clova/clova.service';
import { ClovaController } from './clova/clova.controller';
import { ClovaModule } from './clova/clova.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, ProfileModule, ClovaModule],
  controllers: [AppController, ClovaController],
  providers: [AppService, ClovaService],
})
export class AppModule {}
