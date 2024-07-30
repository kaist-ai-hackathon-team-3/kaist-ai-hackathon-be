import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreatePolicyDto {
  @ApiProperty({
    description: 'Type of support provided by the policy',
    example: 'Financial',
  })
  @IsString()
  supportType: string;

  @ApiProperty({
    description: 'Name of the service or policy',
    example: 'Student Grant',
  })
  @IsString()
  serviceName: string;

  @ApiProperty({
    description: 'Purpose of the service or policy',
    example: 'To support students financially during their studies.',
  })
  @IsString()
  servicePurpose: string;

  @ApiProperty({
    description: 'Deadline for applying to the policy',
    example: '2024-12-31',
  })
  @IsString()
  applicationDeadline: string;

  @ApiProperty({
    description: 'Target group for the policy',
    example: 'Undergraduate students',
  })
  @IsString()
  supportTarget: string;

  @ApiProperty({
    description: 'Criteria for selecting applicants',
    example: 'Must be enrolled in a full-time program',
  })
  @IsString()
  selectionCriteria: string;

  @ApiProperty({
    description: 'Details of the support provided',
    example: 'Covers tuition fees and book costs',
  })
  @IsString()
  supportDetails: string;

  @ApiProperty({
    description: 'Method for applying to the policy',
    example: 'Online application through the university portal',
  })
  @IsString()
  applicationMethod: string;

  @ApiProperty({
    description: 'Documents required for the application',
    example: 'Transcripts, recommendation letters',
  })
  @IsString()
  requiredDocuments: string;

  @ApiProperty({
    description: 'Name of the agency receiving applications',
    example: 'University Financial Aid Office',
  })
  @IsString()
  receptionAgencyName: string;

  @ApiProperty({
    description: 'Contact information for inquiries',
    example: 'email@example.com',
  })
  @IsString()
  contactInfo: string;

  @ApiProperty({
    description: 'URL for online application',
    example: 'https://university.example.com/application',
  })
  @IsString()
  onlineApplicationURL: string;

  @ApiProperty({
    description: 'Last modification date of the policy',
    example: '2024-07-01',
  })
  @IsString()
  lastModified: string;

  @ApiProperty({
    description: 'Name of the responsible agency',
    example: 'Department of Education',
  })
  @IsString()
  responsibleAgencyName: string;

  @ApiProperty({
    description: 'Administrative rules applicable to the policy',
    example: 'Rules set by the Department of Education',
  })
  @IsString()
  administrativeRules: string;

  @ApiProperty({
    description: 'Autonomous regulations related to the policy',
    example: 'Local government regulations',
  })
  @IsString()
  autonomousRegulations: string;

  @ApiProperty({
    description: 'Applicable laws related to the policy',
    example: 'Federal Education Act',
  })
  @IsString()
  laws: string;

  @ApiProperty({
    description: 'List of user IDs related to the policy',
    example: [1, 2, 3],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  userIds?: number[];
}
