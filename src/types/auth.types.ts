import {z} from "zod";

export type LoginCredentials = {
    email: string;
    password: string;
};

export type CreateUserAccount = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}