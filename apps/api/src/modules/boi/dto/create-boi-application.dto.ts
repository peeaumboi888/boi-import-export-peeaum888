import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBOIApplicationDto {
  @ApiProperty({ example: 'ABC Company Limited' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'EV Battery Manufacturing' })
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({ example: 'manufacturing', required: false })
  @IsString()
  @IsOptional()
  activityType?: string;

  @ApiProperty({ example: 100000000, required: false })
  @IsNumber()
  @IsOptional()
  investmentAmount?: number;
}
