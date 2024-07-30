import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsInt } from 'class-validator';
import { IsBigInt } from 'class-validator-extended';

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

  @ApiProperty({
    description: 'Kakao ID for the user',
    example: '123456789012345',
    required: false,
  })
  @IsBigInt()
  @IsOptional()
  kakaoId?: BigInt;

  @ApiProperty({
    description: 'Kakao access token for the user',
    example: 'kakao_access_token_example',
    required: false,
  })
  @IsString()
  @IsOptional()
  kakaoAccessToken?: string;

  @ApiProperty({
    description: 'Kakao refresh token for the user',
    example: 'kakao_refresh_token_example',
    required: false,
  })
  @IsString()
  @IsOptional()
  kakaoRefreshToken?: string;

  // Additional properties for relationships
  @ApiProperty({
    description: 'Profile information of the user',
    type: () => ProfileDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  profile?: ProfileDto[];

  @ApiProperty({
    description: 'Refresh tokens associated with the user',
    type: () => RefreshTokenDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  refreshTokens?: RefreshTokenDto[];

  @ApiProperty({
    description: 'Policies associated with the user',
    type: () => PolicyDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  policies?: PolicyDto[];
}

// Define additional DTOs for the related entities

export class ProfileDto {
  @ApiProperty({ description: 'Profile ID', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Profile name', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Region of the profile', example: 'Seoul' })
  @IsString()
  region: string;

  @ApiProperty({ description: 'Gender of the profile', example: 'Male' })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'Occupation of the profile',
    example: 'Software Engineer',
  })
  @IsString()
  occupation: string;

  @ApiProperty({ description: 'Household size', example: 3 })
  @IsInt()
  householdSize: number;

  @ApiProperty({ description: 'Household income', example: 50000 })
  @IsInt()
  householdIncome: number;

  @ApiProperty({
    description: 'Target feature of the profile',
    example: 'Tech',
  })
  @IsString()
  targetFeature: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token ID', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Token value', example: 'refresh_token_example' })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'Creation date of the token',
    example: '2024-07-30T12:00:00Z',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    description: 'Last update date of the token',
    example: '2024-07-30T12:00:00Z',
  })
  @IsString()
  updatedAt: string;
}

export class PolicyDto {
  @ApiProperty({
    description: 'Service ID of the policy',
    example: 'service_id_example',
  })
  @IsString()
  serviceID: string;

  @ApiProperty({
    description: 'Support type of the policy',
    example: 'Financial',
  })
  @IsString()
  supportType: string;

  @ApiProperty({
    description: 'Service name of the policy',
    example: 'Service Name',
  })
  @IsString()
  serviceName: string;

  @ApiProperty({
    description: 'Service purpose of the policy',
    example: 'Purpose of the service',
  })
  @IsString()
  servicePurpose: string;

  @ApiProperty({ description: 'Application deadline', example: '2024-12-31' })
  @IsString()
  applicationDeadline: string;

  @ApiProperty({ description: 'Support target', example: 'Individuals' })
  @IsString()
  supportTarget: string;

  @ApiProperty({
    description: 'Selection criteria',
    example: 'Criteria details',
  })
  @IsString()
  selectionCriteria: string;

  @ApiProperty({
    description: 'Support details',
    example: 'Details of the support',
  })
  @IsString()
  supportDetails: string;

  @ApiProperty({ description: 'Application method', example: 'Online' })
  @IsString()
  applicationMethod: string;

  @ApiProperty({
    description: 'Required documents',
    example: 'Document details',
  })
  @IsString()
  requiredDocuments: string;

  @ApiProperty({ description: 'Reception agency name', example: 'Agency Name' })
  @IsString()
  receptionAgencyName: string;

  @ApiProperty({ description: 'Contact information', example: 'Contact info' })
  @IsString()
  contactInfo: string;

  @ApiProperty({
    description: 'Online application URL',
    example: 'http://example.com',
  })
  @IsString()
  onlineApplicationURL: string;

  @ApiProperty({ description: 'Last modified date', example: '2024-07-30' })
  @IsString()
  lastModified: string;

  @ApiProperty({
    description: 'Responsible agency name',
    example: 'Agency Name',
  })
  @IsString()
  responsibleAgencyName: string;

  @ApiProperty({
    description: 'Administrative rules',
    example: 'Rules details',
  })
  @IsString()
  administrativeRules: string;

  @ApiProperty({
    description: 'Autonomous regulations',
    example: 'Regulations details',
  })
  @IsString()
  autonomousRegulations: string;

  @ApiProperty({ description: 'Laws', example: 'Law details' })
  @IsString()
  laws: string;
}
