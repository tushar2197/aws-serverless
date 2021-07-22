// import jwt from "jsonwebtoken";
import { authModel, authInterface, userModel } from "../models";
import {isValidObjectId} from 'mongoose'
class AuthService {
  async createotp(userid, otp) {
    try {
      let payload: authInterface = {
        otp,
        user: userid,
      };
      const token = new authModel(payload);
      return await token.save();
    } catch (error) {
      return error;
    }
  }

  async verifyOtp(mobileNo, otp) {
    try {
      const userMobile: any = await userModel.findOne({ mobileNo });
      console.log('userMobile :>> ', userMobile);
      const userOtp: any = await authModel.findOne({
        user: ObjectId(userMobile._id),
      });
      console.log('userOtp :>> ', userOtp);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default AuthService;
