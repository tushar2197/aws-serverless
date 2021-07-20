import { Context } from "aws-lambda";
import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { UserService } from "../service/userService";
import { userDTO } from "../models/dto/userDTO";

export class UserController extends UserService {
  constructor(user: Model<any>) {
    super(user);
  }
  /**
   * Create user
   * @param {*} event
   */
  async create(event: any, context?: Context) {
    console.log("functionName", context.functionName);
    try {
      const params: userDTO = JSON.parse(event.body);
      console.log('params :>> ', params);
      const result = this.createUser(params);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
