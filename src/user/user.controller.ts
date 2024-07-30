import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get profile of the currently logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'Profile information of the logged-in user',
    type: UserDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req): UserDto {
    return req.user;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the user to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the user',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update user details by ID' })
  // @ApiParam({
  //   name: 'id',
  //   type: Number,
  //   description: 'ID of the user to update',
  // })
  // @ApiBody({ type: UpdateUserDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User successfully updated',
  //   type: UserDto,
  // })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // async updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<UserDto> {
  //   return this.userService.updateUser(id, updateUserDto);
  // }

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
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.deleteUser(id);
  }
}
