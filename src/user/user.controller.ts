import {
  Controller,
  Delete,
  Get,
  NotFoundException,
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

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserDto] })
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: '로그인한 유저의 정보를 가져옵니다.' })
  @ApiResponse({
    status: 200,
    description: 'Profile information of the logged-in user',
    type: UserDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Request() req): Promise<any> {
    // const userId = req.user.id;
    const userId = 1;
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      kakaoId: user.kakaoId ? user.kakaoId.toString() : null,
    };
  }

  // @UseGuards(JwtAuthGuard)
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
