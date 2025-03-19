import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * The RolesGuard is a custom guard used for route authorization based on user roles.
 * It checks if the user has the required roles to access a protected route.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * The canActivate method implements the authorization logic of the guard.
   * @param context - The execution context for the route.
   * @returns A boolean indicating whether access should be allowed or denied.
   */
  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from route metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('requiredRoles', requiredRoles);

    // Allow access if no roles are required
    if (!requiredRoles) {
      return true;
    }

    // Get the request object from the context
    const request = context.switchToHttp().getRequest();
    console.log('User object:', request.user);

    // Check if the user object and user's role are defined
    if (!request.user || !request.user.role) {
      console.log('User does not have any role');
      throw new UnauthorizedException('User does not have any role');
    }

    // Get the user's role
    const userRole = request.user.role;

    // Check if the user has at least one of the required roles
    const hasRole = requiredRoles.some((role: string) =>
      userRole.includes(role)
    );

    if (!hasRole) {
      console.log('User does not have the required role');
      throw new UnauthorizedException(
        `User does not have the required role: [${requiredRoles}]`
      );
    }

    return true;
  }
}
