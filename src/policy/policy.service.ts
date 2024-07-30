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

      return response.data;
    } catch (error) {
      console.error('Error', error.response?.data || error.message);
      throw error;
    }
  }

  async create() {
    const apiData = await this.getApi();

    const policyData = apiData.data.map((item) => ({
      serviceID: item.서비스ID,
      supportType: item.지원유형,
      serviceName: item.서비스명,
      servicePurpose: item.서비스목적,
      applicationDeadline: item.신청기한,
      supportTarget: item.지원대상,
      selectionCriteria: item.선정기준,
      supportDetails: item.지원내용,
      applicationMethod: item.신청방법,
      requiredDocuments: item.구비서류,
      receptionAgencyName: item.접수기관명,
      contactInfo: item.문의처,
      onlineApplicationURL: item.온라인신청사이트URL,
      lastModified: item.수정일시,
      responsibleAgencyName: item.소관기관명,
      administrativeRules: item.행정규칙,
      autonomousRegulations: item.자치법규,
      laws: item.법령,
    }));

    try {
      await this.prismaService.policy.createMany({
        data: policyData,
        skipDuplicates: true, // Skip if the record already exists
      });
      return 'Policies added successfully';
    } catch (error) {
      console.error('Error creating policies:', error.message);
      throw error;
    }
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
