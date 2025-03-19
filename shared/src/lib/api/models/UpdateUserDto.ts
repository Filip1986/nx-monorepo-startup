/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateUserDto = {
    /**
     * The name of the user
     */
    name: string;
    /**
     * The email of the user
     */
    email: string;
    /**
     * The username of the user
     */
    username: string;
    /**
     * The role of the user
     */
    role: UpdateUserDto.role;
    /**
     * The start hour of the user's shift
     */
    startHour: string;
    /**
     * The duration of the user's shift in hours
     */
    shiftDuration: number;
    /**
     * The password of the user
     */
    password: string;
};
export namespace UpdateUserDto {
    /**
     * The role of the user
     */
    export enum role {
        ADMIN = 'admin',
        USER = 'user',
    }
}

