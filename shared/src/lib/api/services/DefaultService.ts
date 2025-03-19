/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { LoginDto } from '../models/LoginDto';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class DefaultService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @returns any
     * @throws ApiError
     */
    public appControllerGetData(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public authControllerLogin(
        requestBody: LoginDto,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public authControllerGetCurrentUser(
        authorization: string,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/auth/me',
            headers: {
                'authorization': authorization,
            },
        });
    }
}
