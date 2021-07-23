import { Handler } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import '../config/db';
import { UserController } from './controller/userController';
const userController = new UserController();
const dotenvPath = path.join(
    __dirname,
    '../',
    `config/.env.${process.env.NODE_ENV}`,
);
dotenv.config({
    path: dotenvPath,
});
export const create: Handler = (event: any) => {
    return userController.create(event);
};

export const verifyOTP: Handler = (event: any) => {
    return userController.verifyOtp(event);
};
export const updateProfile: Handler = (event: any) => {
    return userController.userProfileUpdate(event);
};
