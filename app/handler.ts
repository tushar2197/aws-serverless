import { Handler, Context } from "aws-lambda";
import dotenv from "dotenv";
import path from "path";
import { User } from "./models";
import '../config/db'
import { UserController } from "./controller/userController";
const userController = new UserController(User);
const dotenvPath = path.join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});
export const create: Handler = (event: any, context: Context) => {
  return userController.create(event, context);
};
