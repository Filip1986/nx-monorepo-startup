import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  private readonly appHost = process.env.APP_HOST;

  constructor(
    private prisma: PrismaService,
    private mailService: MailService
  ) {}

  private toUserDto(user: User): UserDto {
    return new UserDto(user);
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user ? this.toUserDto(user) : null;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return users.map(this.toUserDto);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.create({
      data,
    });
    return this.toUserDto(user);
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<UserDto> {
    const { where, data } = params;
    const user = await this.prisma.user.update({
      data,
      where,
    });
    return this.toUserDto(user);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserDto> {
    const user = await this.prisma.user.delete({
      where,
    });
    return this.toUserDto(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  private async findByResetToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: {
          gte: new Date(),
        },
      },
    });
  }

  private async findByEmailConfirmationToken(
    token: string
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        emailConfirmationToken: token,
        emailConfirmationTokenExpiresAt: {
          gte: new Date(),
        },
      },
    });
  }

  private generateUniqueToken(): string {
    return uuidv4();
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async save(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: user.password,
        passwordResetToken: user.passwordResetToken,
        passwordResetTokenExpiresAt: user.passwordResetTokenExpiresAt,
      },
    });
  }

  private calculateTokenExpiration(): Date {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); // Token expires in 1 hour
    return expiration;
  }

  /**
   * Check if resetToken is not expired
   * @param user
   * @returns
   */
  private isResetTokenValid(user: User): boolean {
    return (
      user.passwordResetTokenExpiresAt &&
      user.passwordResetTokenExpiresAt > new Date()
    );
  }

  private ensureTokenNotExpired(user: User): void {
    if (
      !user.emailConfirmationTokenExpiresAt ||
      user.emailConfirmationTokenExpiresAt <= new Date()
    ) {
      throw new Error('Confirmation link not found or has expired.');
    }
  }

  private async markEmailAsConfirmed(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailConfirmed: true,
        emailConfirmationToken: null,
        emailConfirmationTokenExpiresAt: null,
      },
    });
  }

  /**
   * Send mail to the user with a reset password link
   * @param email
   */
  async initiatePasswordReset(email: string) {
    const user = await this.findOneByEmail(email);

    if (user) {
      const resetToken = this.generateUniqueToken();
      const tokenExpiration = this.calculateTokenExpiration();

      await this.prisma.user.update({
        where: { email },
        data: {
          passwordResetToken: resetToken,
          passwordResetTokenExpiresAt: tokenExpiration,
        },
      });

      const resetLink = `${this.appHost}/reset-password/${resetToken}`;

      await this.mailService.sendResetPasswordEmail(
        user.email,
        user.username,
        resetLink
      );
    } else {
      throw new Error('User not found');
    }
  }

  /**
   * Reset current password with new password
   * @param token
   * @param newPassword
   */
  async resetPassword(token: string, newPassword: string): Promise<string> {
    const user = await this.findByResetToken(token);

    if (!user) {
      throw new Error('User not found');
    }

    if (!this.isResetTokenValid(user)) {
      throw new Error('Invalid or expired reset token');
    }

    user.password = await this.hashPassword(newPassword);
    user.passwordResetToken = null;
    user.passwordResetTokenExpiresAt = null;
    await this.save(user);

    return 'Password reset successful.';
  }

  /**
   * Confirm a user's email address using the provided confirmation token.
   * @param token - The email confirmation token.
   */
  async confirmEmail(token: string): Promise<void> {
    const user = await this.findByEmailConfirmationToken(token);

    if (!user) {
      throw new Error('Confirmation link not found or has expired.');
    }

    if (user.isEmailConfirmed) {
      throw new Error('Email is already confirmed.');
    }

    this.ensureTokenNotExpired(user);
    await this.markEmailAsConfirmed(user);
  }
}
