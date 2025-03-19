import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const allowedRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getUserRole(); // Assuming this method exists

  console.log('isLogin', authService.isLoggedIn());
  console.log('userRole', userRole);
  console.log('allowedRoles', allowedRoles);

  if (!authService.isLoggedIn()) {
    return of(router.parseUrl('/login'));
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return of(router.parseUrl('/login'));
  }

  return of(true);
};
