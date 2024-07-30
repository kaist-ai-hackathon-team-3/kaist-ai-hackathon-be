import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsInt } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'Unique identifier of the user', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  // 추가적인 프로퍼티들
}
