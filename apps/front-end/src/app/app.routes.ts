import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'users-view',
    canActivate: [authGuard],
    data: { roles: ['user', 'admin'] },
    loadComponent: () =>
      import('./user-view/user-view.component').then(
        (m) => m.UserViewComponent
      ),
  },
  {
    path: 'admin-view',
    canActivate: [authGuard],
    data: { roles: ['admin'] },
    loadComponent: () =>
      import('./admin-view/admin-view.component').then(
        (m) => m.AdminViewComponent
      ),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    data: { roles: ['user'] },
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
