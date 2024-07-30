import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({ summary: '새 프로필 생성' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, description: '성공', type: CreateProfileDto })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 프로필 불러오기' })
  @ApiResponse({ status: 201, description: '성공', type: [CreateProfileDto] })
  findAll() {
    return this.profileService.findAll();
  }

  @ApiOperation({ summary: 'id에 따른 프로필 불러오기' })
  @ApiResponse({ status: 201, description: '성공', type: CreateProfileDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiParam({ name: 'id', required: true, description: '프로필 ID' })
  @ApiResponse({ status: 200, description: '성공', type: UpdateProfileDto })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '프로필 삭제' })
  @ApiParam({ name: 'id', required: true, description: '프로필 ID' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '프로필을 찾을 수 없음' })
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
