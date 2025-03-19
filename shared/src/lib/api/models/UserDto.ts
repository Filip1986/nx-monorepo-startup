/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserDto = {
    /**
     * The ID of the user
     */
    id: number;
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
    role: UserDto.role;
    /**
     * The start hour of the user's shift
     */
    startHour: string;
    /**
     * The duration of the user's shift in hours
     */
    shiftDuration: number;
    /**
     * The date when the user was created
     */
    createdAt: string;
    /**
     * The date when the user was last updated
     */
    updatedAt: string;
};
export namespace UserDto {
    /**
     * The role of the user
     */
    export enum role {
        ADMIN = 'admin',
        USER = 'user',
    }
}

