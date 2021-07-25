import { Handler } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import '../config/db';
import { UserController } from './controller/userController';
import JwtMiddelware from './middelware/jwtMiddelware'
const userController = new UserController();
const jwtMiddelware = new JwtMiddelware()
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
    userController.userProfileUpdate(event);

};
export const loginUser: Handler = (event: any) => {
    return userController.loginUser(event)
}
export const authorize: Handler = async (event: any) => {
    console.log('demo :>> ', event.authorizationToken);
    return await jwtMiddelware.tokenDecrypt(event.authorizationToken)
}
