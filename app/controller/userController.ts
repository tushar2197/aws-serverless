import { Model } from "mongoose";
import { messageUtils, otpUtils } from "../utils";
import userService from "../service/userService";
import AuthService from "../service/authservice";
import { userDto } from "../models";
export class UserController extends userService {
  auth = new AuthService();
  constructor(user: Model<any>) {
    super(user);
  }
  /**
   * Create user
   * @param {*} event
   */
  public async create(event: any) {
    try {
      const params: userDto = JSON.parse(event.body);
      let result: any = await this.createUser(params);
      if (result) {
        const otp = await otpUtils.OTP();
        await this.auth.createotp(result._id, otp);
        let result1 = {
          ...result._doc,
          otp,
        };

        return await messageUtils.success(result1);
      } else {
        throw new Error("user is not created");
      }
    } catch (err) {
      return messageUtils.error(err.code, err.message);
    }
  }
}
