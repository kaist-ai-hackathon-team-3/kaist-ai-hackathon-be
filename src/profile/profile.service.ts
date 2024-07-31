import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    // Check if the user exists
    const userExists = await this.prismaService.user.findUnique({
      where: { id: createProfileDto.userId },
    });

    if (!userExists) {
      throw new Error('User does not exist');
    }

    // Create the profile
    return this.prismaService.profile.create({ data: createProfileDto });
  }

  findAll() {
    return this.prismaService.profile.findMany();
  }

  findOne(id: number) {
    return this.prismaService.profile.findUnique({
      where: {
        id: id,
      },
    });
  }

  findByUser(userId: number) {
    return this.prismaService.profile.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.prismaService.profile.update({
      where: {
        id: id,
      },
      data: updateProfileDto,
    });
  }

  remove(id: number) {
    return this.prismaService.profile.delete({
      where: {
        id: id,
      },
    });
  }
}
