import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('kakao')
  @ApiOperation({ summary: 'Start Kakao login' })
  @ApiResponse({
    status: 200,
    description: 'Redirects to Kakao login page.',
  })
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {}

  @Get('kakao/callback')
  @ApiOperation({ summary: 'Handle Kakao login callback' })
  @ApiResponse({
    status: 200,
    description:
      'Kakao login callback which returns access and refresh tokens.',
    schema: {
      example: {
        access_token: 'your_access_token_here',
        refresh_token: 'your_refresh_token_here',
      },
    },
  })
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req) {
    const user = req.user;
    const { access_token, refresh_token } = await this.authService.login(user);
    return { access_token, refresh_token };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({
    description: 'User login credentials',
    schema: {
      example: {
        username: 'user@example.com',
        password: 'password123',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description:
      'User successfully logged in, returns access and refresh tokens.',
    schema: {
      example: {
        access_token: 'your_access_token_here',
        refresh_token: 'your_refresh_token_here',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh an access token using a refresh token' })
  @ApiBody({
    description: 'Refresh token to get a new access token',
    schema: {
      example: {
        refresh_token: 'your_refresh_token_here',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'New access token issued',
    schema: {
      example: {
        access_token: 'new_access_token_here',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout a user by invalidating the refresh token' })
  @ApiBody({
    description: 'Refresh token to be invalidated',
    schema: {
      example: {
        refresh_token: 'your_refresh_token_here',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    schema: {
      example: {
        message: 'Logged out',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Body('refresh_token') refreshToken: string) {
    await this.userService.invalidateRefreshToken(refreshToken);
    return { message: 'Logged out' };
  }
}
