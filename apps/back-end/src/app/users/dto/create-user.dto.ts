import { IsEmail, IsString, IsEnum, IsInt, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The role of the user', enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ description: "The start hour of the user's shift" })
  @IsString()
  startHour: string;

  @ApiProperty({ description: "The duration of the user's shift in hours" })
  @IsInt()
  shiftDuration: number;
}
