import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //현재 유저 기능이 필요한 파트

  /*
  - [ ] 프로필 창
  - [ ] 채팅에서 '누구'의  '아들'에서 필요
  */

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserDto] })
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: '로그인한 유저의 정보를 가져옵니다.' })
  @ApiResponse({
    status: 200,
    description: 'Profile information of the logged-in user',
    type: UserDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMe(@Request() req): any {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the user to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Request() req): Promise<UserDto> {
    return this.userService.deleteUser(req.user.id);
  }
}
