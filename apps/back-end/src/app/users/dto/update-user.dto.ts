import { IsEmail, IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'The role of the user', enum: Role })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({ description: "The start hour of the user's shift" })
  @IsString()
  @IsOptional()
  startHour?: string;

  @ApiProperty({ description: "The duration of the user's shift in hours" })
  @IsInt()
  @IsOptional()
  shiftDuration?: number;

  @ApiProperty({ description: 'The password of the user' })
  @IsOptional()
  @IsString()
  password?: string;
}
