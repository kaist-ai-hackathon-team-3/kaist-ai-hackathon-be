import { IsEnum, IsInt, IsString, Min, Max } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  region: string;

  @IsEnum(['남성', '여성'])
  gender: string;

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
  occupation: string;

  @IsInt()
  @Min(1)
  @Max(10)
  householdSize: number;

  @IsInt()
  householdIncome: number;

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
  targetFeature: string;
}
