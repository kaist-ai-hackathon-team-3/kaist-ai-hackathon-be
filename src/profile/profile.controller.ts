import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: '새 프로필 생성' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, description: '성공', type: CreateProfileDto })
  create(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    const data = { userId: req.user.id, ...createProfileDto };
    return this.profileService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '로그인한 유저의 모든 프로필 불러오기' })
  @ApiResponse({ status: 201, description: '성공', type: CreateProfileDto })
  @Get()
  findUserProfile(@Request() req) {
    return this.profileService.findByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiParam({ name: 'id', required: true, description: '프로필 ID' })
  @ApiResponse({ status: 200, description: '성공', type: UpdateProfileDto })
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.profileService.findOne(+id);
    if (profile.userId === req.user.id) {
      return this.profileService.update(+id, updateProfileDto);
    } else {
      throw new HttpException('권한 없음', HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '프로필 삭제' })
  @ApiParam({ name: 'id', required: true, description: '프로필 ID' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '프로필을 찾을 수 없음' })
  async remove(@Request() req, @Param('id') id: string) {
    const profile = await this.profileService.findOne(+id);
    if (profile.userId === req.user.id) {
      return this.profileService.remove(+id);
    } else {
      throw new HttpException('권한 없음', HttpStatus.FORBIDDEN);
    }
  }
}
