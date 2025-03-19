/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { ForgotPasswordDto } from '../models/ForgotPasswordDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UserDto } from '../models/UserDto';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(public readonly http: HttpClient) {}
    /**
     * Create a new user
     * @param requestBody
     * @returns UserDto The user has been successfully created.
     * @throws ApiError
     */
    public usersControllerCreateUser(
        requestBody: CreateUserDto,
    ): Observable<UserDto> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all users
     * @returns UserDto Return all users.
     * @throws ApiError
     */
    public usersControllerGetAllUsers(): Observable<Array<UserDto>> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users',
        });
    }
    /**
     * Get a user by id
     * @param id
     * @returns UserDto Return the user.
     * @throws ApiError
     */
    public usersControllerGetUserById(
        id: string,
    ): Observable<UserDto> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }
    /**
     * Update a user
     * @param id
     * @param requestBody
     * @returns UserDto The user has been successfully updated.
     * @throws ApiError
     */
    public usersControllerUpdateUser(
        id: string,
        requestBody: UpdateUserDto,
    ): Observable<UserDto> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a user
     * @param id
     * @returns UserDto The user has been successfully deleted.
     * @throws ApiError
     */
    public usersControllerDeleteUser(
        id: string,
    ): Observable<UserDto> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Initiate password reset
     * @param requestBody
     * @returns any Password reset email sent.
     * @throws ApiError
     */
    public usersControllerForgotPassword(
        requestBody: ForgotPasswordDto,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid email address.`,
                404: `User not found.`,
            },
        });
    }
    /**
     * @param token
     * @returns any
     * @throws ApiError
     */
    public usersControllerResetPassword(
        token: string,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users/reset-password/{token}',
            path: {
                'token': token,
            },
        });
    }
    /**
     * @param token
     * @returns any
     * @throws ApiError
     */
    public usersControllerConfirmEmail(
        token: string,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users/confirm-email/{token}',
            path: {
                'token': token,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public usersControllerPrivateContent(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users/private-content-jwt',
        });
    }
    /**
     * Admin role only route
     * @returns any Admin route accessed.
     * @throws ApiError
     */
    public usersControllerAdminOnly(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users/admin-only',
        });
    }
    /**
     * User role only route
     * @returns any User route accessed.
     * @throws ApiError
     */
    public usersControllerUserOnly(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users/user-only',
        });
    }
    /**
     * Admin or Manager role only route
     * @returns any Admin or Manager route accessed.
     * @throws ApiError
     */
    public usersControllerAdminOrManager(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users/admin-or-manager',
        });
    }
}
