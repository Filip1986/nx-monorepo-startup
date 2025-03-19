import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Logger,
  UseGuards,
  Get,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.debug(`Login attempt for email: ${loginDto.email}`);

    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password
      );
      if (!user) {
        this.logger.warn(`Login failed for email: ${loginDto.email}`);
        throw new UnauthorizedException('Invalid credentials');
      }
      this.logger.log(`Login successful for email: ${loginDto.email}`);
      return this.authService.login(user);
    } catch (error) {
      this.logger.error(
        `Login error for email: ${loginDto.email}`,
        error.stack
      );
      throw new UnauthorizedException('Login failed');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Headers('authorization') authHeader: string) {
    console.log('token', authHeader);
    const token = authHeader.split(' ')[1]; // Extract the token from the header
    return this.authService.getCurrentUserFromToken(token);
  }
}
