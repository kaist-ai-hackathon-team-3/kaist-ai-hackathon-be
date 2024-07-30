import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ClovaModule } from './clova/clova.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, ProfileModule, ClovaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
