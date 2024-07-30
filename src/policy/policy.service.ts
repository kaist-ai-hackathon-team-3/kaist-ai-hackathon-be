import { Injectable } from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PolicyService {
  constructor(
    private httpService: HttpService,
    private prismaService: PrismaService,
  ) {}
  async getApi() {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.odcloud.kr/api/gov24/v3/serviceDetail?page=1&perPage=2000&serviceKey=tMW7HjUow9pR8Otha9TtbcOEGHeGdAZBSo%2Fq%2FkTzXKodD%2Fi%2BvzXdcCMY0tyzq%2FrVRmT%2FdYRdZVNHL%2BoH%2FMC6Tg%3D%3D',
        ),
      );
      return { law: response.data.법령 };
    } catch (error) {
      console.error('Error', error.response?.data || error.message);
      throw error;
    }
  }

  create(createPolicyDto: CreatePolicyDto) {
    return 'This action adds a new policy';
  }

  findAll() {
    return `This action returns all policy`;
  }

  findOne(id: number) {
    const stringId = id.toString();
    return this.prismaService.policy.findUnique({
      where: {
        serviceID: stringId,
      },
    });
  }

  update(id: number, updatePolicyDto: UpdatePolicyDto) {
    return `This action updates a #${id} policy`;
  }

  remove(id: number) {
    return `This action removes a #${id} policy`;
  }
  async addUser(policyId: number, userId: number) {
    const stringPolicyId = policyId.toString();

    return this.prismaService.policyOnUsers.create({
      data: {
        userId: userId,
        policyId: stringPolicyId,
      },
    });
  }

  async removeUser(policyId: number, userId: number) {
    const stringPolicyId = policyId.toString();

    return this.prismaService.policyOnUsers.deleteMany({
      where: {
        userId: userId,
        policyId: stringPolicyId,
      },
    });
  }
}
