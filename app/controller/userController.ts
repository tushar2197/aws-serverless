import { Model } from "mongoose";
import { messageUtils, otpUtils } from "../utils";
import userService from "../service/userService";
// import AuthService from "../service/authservice";
import { userDto } from "../models";
export class UserController extends userService {
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
        // await AuthService.createUser(result._id, otp);
        result = {
          ...result,
          otp,
        };

        return await messageUtils.success(result);
      } else {
        throw new Error("user is not created");
      }
    } catch (err) {
      return messageUtils.error(err.code, err.message);
    }
  }
}
