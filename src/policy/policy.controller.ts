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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Policy')
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @ApiOperation({ summary: '정부24에서 받은 정책 2000개 db에 저장' })
  @ApiBody({ type: CreatePolicyDto })
  @ApiResponse({
    status: 201,
    description: 'The policy has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create() {
    return this.policyService.create();
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all policies' })
  @ApiResponse({
    status: 200,
    description: 'List of policies',
    type: [CreatePolicyDto], // Adjust if you have a specific DTO for responses
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findAll() {
    return this.policyService.getApi();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a policy by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the policy to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the policy',
    type: CreatePolicyDto, // Adjust if you have a specific DTO for responses
  })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  findOne(@Param('id') id: string) {
    return this.policyService.findOne(+id);
  }

  @Get('/category/:id')
  @ApiOperation({ summary: 'Retrieve a policy by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'categoryID로 해당 카테고리의 모든 정책 불러오기',
  })
  @ApiResponse({
    status: 200,
    description: '해당 category의 정책 목록',
    type: CreatePolicyDto, // Adjust if you have a specific DTO for responses
  })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  findByCategory(@Param('id') id: string) {
    return this.policyService.findByCategory(+id);
  }

  @Patch(':id/:userId')
  @ApiOperation({ summary: 'Update policy by adding or removing a user' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the policy to update',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'The ID of the user to add or remove',
  })
  @ApiBody({
    type: String,
    enum: ['add', 'remove'],
    description: 'Action to be performed: add or remove user',
  })
  @ApiResponse({
    status: 200,
    description: 'Policy updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Policy or user not found' })
  @ApiResponse({ status: 400, description: 'Invalid action provided' })
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
  @ApiOperation({ summary: 'Delete a policy by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the policy to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Policy successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.policyService.remove(+id);
  }
}
