import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { DefaultService, UserDto } from '@nx-monorepo-startup/shared';
import { SetUsername } from '../../store/auth.actions';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserDto | null>;
  currentUser: Observable<UserDto | null>;

  constructor(private store: Store, private defaultService: DefaultService) {
    this.currentUserSubject = new BehaviorSubject<UserDto | null>(
      this.getUserFromLocalStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromLocalStorage(): UserDto | null {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch (error) {
        console.error('Error parsing tablet data from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  login(email: string, password: string): Observable<UserDto | null> {
    return this.defaultService.authControllerLogin({ email, password }).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
      }),
      switchMap(() => this.getCurrentUser()),
      catchError((error) => {
        console.error('Login error:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.store.dispatch(new SetUsername(''));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.role : '';
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCurrentUser(): Observable<UserDto> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    return this.defaultService
      .authControllerGetCurrentUser(`Bearer ${token}`)
      .pipe(
        tap((user: UserDto) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.store.dispatch(new SetUsername(user.email));
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    // Return an observable with a tablet-facing error message
    return throwError(
      () => new Error('Unable to fetch tablet data. Please try again later.')
    );
  }
}
