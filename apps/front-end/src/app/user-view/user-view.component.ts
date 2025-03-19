import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async logout(): Promise<void> {
    this.authService.logout();
    try {
      await this.router.navigate(['/login']);
      console.log('Navigation to login successful');
    } catch (error) {
      console.error('Navigation to login failed', error);
    }
  }

  async navigateToUsersView(): Promise<void> {
    try {
      await this.router.navigate(['/users-view']);
      console.log('Navigation to Users View successful');
    } catch (error) {
      console.error('Navigation to Users View failed', error);
    }
  }

  async navigateToAdminView(): Promise<void> {
    try {
      await this.router.navigate(['/admin-view']);
      console.log('Navigation to Admin View successful');
    } catch (error) {
      console.error('Navigation to Admin View failed', error);
    }
  }
}
