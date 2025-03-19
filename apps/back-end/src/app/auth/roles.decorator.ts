import { SetMetadata } from '@nestjs/common';

/**
 * The ROLES_KEY constant represents the metadata key for specifying roles on routes.
 * It is used in conjunction with the Roles decorator.
 */
export const ROLES_KEY = 'roles';

/**
 * The Roles decorator is used to specify roles that are allowed to access a route or controller.
 * It sets the 'roles' metadata key to an array of roles for the decorated route or controller.
 * @param roles - An array of role names allowed to access the route or controller.
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
