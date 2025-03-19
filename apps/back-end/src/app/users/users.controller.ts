import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiProperty,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { IsEmail } from 'class-validator';

class ForgotPasswordDto {
  @ApiProperty({
    description: 'The email address of the user requesting a password reset',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users.',
    type: [UserDto],
  })
  async getAllUsers(): Promise<UserDto[]> {
    return this.usersService.users({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.usersService.user({ id: Number(id) });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserDto,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserDto,
  })
  async deleteUser(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.deleteUser({ id: Number(id) });
  }

  /**
   * Initiate the process of resetting a user's password by sending a reset email.
   * @returns A success message indicating that a password reset email has been sent.
   * @param forgotPasswordDto
   */
  @Post('forgot-password')
  @ApiOperation({ summary: 'Initiate password reset' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email address.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.usersService.initiatePasswordReset(forgotPasswordDto.email);
    return 'Password reset email sent.';
  }

  /**
   * Reset a user's password using a valid reset token.
   * @param token - The reset token sent to the user's email.
   * @param password - The new password.
   * @returns A success message indicating that the password has been reset.
   */
  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string
  ) {
    await this.usersService.resetPassword(token, password);
    return 'Password reset successful.';
  }

  /**
   * Confirm a user's email address using the provided confirmation token.
   * @param token - The email confirmation token.
   * @returns A success message indicating that email confirmation is successful.
   *          Returns an error message if the confirmation link is invalid or expired.
   */
  @Post('confirm-email/:token')
  async confirmEmail(@Param('token') token: string) {
    try {
      await this.usersService.confirmEmail(token);
      return 'Email confirmation successful. You can now log in.';
    } catch (error) {
      if (error instanceof NotFoundException) {
        return 'Email confirmation link is invalid or has expired.';
      }
      throw error;
    }
  }

  /**
   * Access a private content endpoint protected by JWT authentication.
   * @returns A message indicating access to private content.
   */
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('private-content-jwt')
  async privateContent() {
    return 'Private content!';
  }

  /**
   * Access an admin-only route. Requires 'admin' role.
   * @returns A message indicating access to an admin-only route.
   */
  @Get('admin-only')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin role only route' })
  @ApiResponse({ status: 200, description: 'Admin route accessed.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  async adminOnly() {
    return 'Admin route accessed.';
  }

  /**
   * Access a user-only route. Requires 'user' role.
   * @returns A message indicating access to a user-only route.
   */
  @Get('user-only')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'User role only route' })
  @ApiResponse({ status: 200, description: 'User route accessed.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.user)
  async userOnly() {
    return 'User route accessed.';
  }

  /**
   * Access an 'admin' or 'manager' route. Requires 'admin' or 'manager' role.
   * @returns A message indicating access to an 'admin' or 'manager' route.
   */
  @Get('admin-or-manager')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin or Manager role only route' })
  @ApiResponse({ status: 200, description: 'Admin or Manager route accessed.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.user)
  async adminOrManager() {
    return 'Admin or User route accessed.';
  }
}
