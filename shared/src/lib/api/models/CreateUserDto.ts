/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUserDto = {
    /**
     * The name of the user
     */
    name: string;
    /**
     * The email of the user
     */
    email: string;
    /**
     * The password of the user
     */
    password: string;
    /**
     * The username of the user
     */
    username: string;
    /**
     * The role of the user
     */
    role: CreateUserDto.role;
    /**
     * The start hour of the user's shift
     */
    startHour: string;
    /**
     * The duration of the user's shift in hours
     */
    shiftDuration: number;
};
export namespace CreateUserDto {
    /**
     * The role of the user
     */
    export enum role {
        ADMIN = 'admin',
        USER = 'user',
    }
}

