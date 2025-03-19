import { Component, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { TabViewModule } from 'primeng/tabview';
import { AuthService } from '../core/services/auth.service';
import { MessageModule } from 'primeng/message';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ForgotPasswordDto, UsersService } from '@nx-monorepo-startup/shared';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MessagesModule,
    TabViewModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  loginForm: FormGroup;
  messages = signal<any[]>([]);
  tvCode = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onUserSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          if (user) {
            if (user.role === 'admin') {
              this.router.navigate(['/admin-view']);
            } else {
              this.router.navigate(['/users-view']);
            }
          } else {
            this.messages.set([
              {
                severity: 'error',
                content: 'Login failed. Please try again.',
              },
            ]);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.messages.set([
            {
              severity: 'error',
              content: error.error?.message || 'Invalid email or password',
            },
          ]);
        },
      });
    } else {
      this.validateForm();
    }
  }

  validateForm(): void {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onForgotPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      const forgotPasswordDto = { email };
      this.usersService
        .usersControllerForgotPassword(forgotPasswordDto)
        .subscribe({
          next: () => {
            this.messages.set([
              {
                severity: 'success',
                content: 'Password reset email sent.',
              },
            ]);
          },
          error: (error: unknown) => {
            console.error('Forgot password request failed', error);
            this.messages.set([
              {
                severity: 'error',
                content: 'Unable to process request. Please try again later.',
              },
            ]);
          },
        });
    } else {
      this.messages.set([
        {
          severity: 'error',
          content: 'Please enter a valid email address.',
        },
      ]);
    }
  }
}
