import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policyService.create(createPolicyDto);
  }

  @Get()
  findAll() {
    return this.policyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policyService.findOne(+id);
  }

  @Patch(':id/:userId')
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body('action') action: 'add' | 'remove', // action 파라미터로 추가 또는 제거를 지정
  ) {
    if (action === 'add') {
      return this.policyService.addUser(+id, +userId);
    } else if (action === 'remove') {
      return this.policyService.removeUser(+id, +userId);
    } else {
      throw new Error('Invalid action');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policyService.remove(+id);
  }
}
