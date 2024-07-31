import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Min, Max } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '지역' })
  @IsString()
  region: string;

  @ApiProperty({ description: '성별', enum: ['남성', '여성'] })
  @IsEnum(['남성', '여성'])
  gender: '남성' | '여성';

  @ApiProperty({
    description: '직업',
    enum: [
      '초중고생',
      '대학생/대학원생',
      '구직자',
      '근로자/직장인',
      '실업자/무직자',
      '(예비)창업자',
      '주부',
      '특수종사자',
    ],
  })
  @IsEnum([
    '초중고생',
    '대학생/대학원생',
    '구직자',
    '근로자/직장인',
    '실업자/무직자',
    '(예비)창업자',
    '주부',
    '특수종사자',
  ])
  occupation:
    | '초중고생'
    | '대학생/대학원생'
    | '구직자'
    | '근로자/직장인'
    | '실업자/무직자'
    | '(예비)창업자'
    | '주부'
    | '특수종사자';

  @ApiProperty({ description: '가구 구성원의 수', minimum: 1, maximum: 10 })
  @IsInt()
  @Min(1)
  @Max(10)
  householdSize: number;

  @ApiProperty({ description: '가구 소득' })
  @IsInt()
  householdIncome: number;

  @ApiProperty({
    description: '타겟 특성',
    enum: [
      '해당사항없음',
      '장애인',
      '농축수산인',
      '질병/부상/질환자',
      '북한이탈주민',
      '외국인/재외국인',
      '결혼임산출산',
      '국가보훈대상자',
      '군복무',
      '아동청소년유형',
      '복지지원대상자',
      '가족유형',
      '기타',
    ],
  })
  @IsEnum([
    '해당사항없음',
    '장애인',
    '농축수산인',
    '질병/부상/질환자',
    '북한이탈주민',
    '외국인/재외국인',
    '결혼임산출산',
    '국가보훈대상자',
    '군복무',
    '아동청소년유형',
    '복지지원대상자',
    '가족유형',
    '기타',
  ])
  targetFeature:
    | '해당사항없음'
    | '장애인'
    | '농축수산인'
    | '질병/부상/질환자'
    | '북한이탈주민'
    | '외국인/재외국인'
    | '결혼임산출산'
    | '국가보훈대상자'
    | '군복무'
    | '아동청소년유형'
    | '복지지원대상자'
    | '가족유형'
    | '기타';

  @ApiProperty({ description: '프로필을 생성한 유저의 id' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: '나이', example: 30 })
  @IsInt()
  @Min(1)
  age: number;
}
