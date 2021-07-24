import { Types } from "mongoose";
import { authModel, authInterface } from "../models";
import UserService from "./userService";
import { jwtUtils } from "../utils";

class AuthService {
  protected userService = new UserService();
  async createotp(userid: string, otp: number) {
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

  async verifyOtp(mobileNo: string, otp: number) {
    // Find user details using mobile no
    const userMobile: any = await this.userService.findByMobileNO(mobileNo);
    // Get user otp details if exists
    const userOtp: any = await authModel.findOne({
      user: userMobile._id,
    });
    if (userOtp != null) {
      if (userOtp.otp === otp) {
        // Mobile Number verified
        this.otpRemove(userMobile._id);
        const token = jwtUtils.createJwtToken(userMobile);
        return token;
      } else {
        // Mobile Number is not verified
        throw new Error("otp is invalid");
      }
    } else {
      throw new Error("otp is expiry");
    }
  }
  async otpRemove(userId: string) {
    // Delete user otp after verify
    const userOtpDelete: any = await authModel.deleteOne({
      user: Types.ObjectId(userId),
    });
    if (userOtpDelete) {
      // otp is delete after verified
      return userOtpDelete;
    } else {
      // otp deletion failed
      throw new Error("otp is not found");
    }
  }
}

export default AuthService;
