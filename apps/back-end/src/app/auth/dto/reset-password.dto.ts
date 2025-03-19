import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'The new password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'The reset token' })
  @IsString()
  token: string;
}
