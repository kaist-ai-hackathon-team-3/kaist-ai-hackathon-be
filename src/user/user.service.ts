import { Injectable } from '@nestjs/common';
import { Prisma, user as User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async setRefreshToken(userId: number, refreshToken: string) {
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
      },
    });
  }

  async getUserIfRefreshTokenMatches(userId: number, refreshToken: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
        refreshTokens: {
          some: {
            token: refreshToken,
          },
        },
      },
    });
  }

  async invalidateRefreshToken(refreshToken: string) {
    await this.prisma.refreshToken.delete({
      where: { token: refreshToken },
    });
  }

  //get
  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  //get
  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true, // 프로필 정보를 포함
        chatRooms: true, // 사용자의 채팅방 정보를 포함
        refreshTokens: true, // 사용자의 리프레시 토큰 정보를 포함
        policies: {
          include: {
            policy: true, // 사용자가 구독한 정책 정보를 포함
          },
        },
      },
    });
  }

  async getUserByUserName(name: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { username: name },
    });
  }

  //put
  async updateUser(id: number, data: Prisma.userUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  //delete
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
