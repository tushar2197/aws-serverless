import { jwtUtils, messageUtils, otpUtils } from "../utils";
import userService from "../service/userService";
import { authService } from "../service/authservice";
import { UserDTO, verifyOtpDTO, profileUpdateDTO } from "../models";
export class UserController extends userService {
  /**
   * Create user
   * @param {*} event
   */
  public async create(event: any) {
    try {
      const params: UserDTO = JSON.parse(event.body);
      let result: any = await this.createUser(params);
      if (result) {
        const otp = await otpUtils.OTP();
        await authService.createotp(result._id, otp);

        return messageUtils.successMessage();
      } else {
        throw new Error("user is not created");
      }
    } catch (err) {
      return messageUtils.error(err.code, err.message);
    }
  }
  /**
   * verify otp with mobileNo
   * @param {*} event
   */
  public async verifyOtp(event: any) {
    try {
      const params: verifyOtpDTO = JSON.parse(event.body);
      const { mobileNo, otp } = params;
      const checkMobileNo: any = await this.findByMobileNO(mobileNo);
      if (!checkMobileNo) {
        throw new Error("mobile no is not found");
      } else {
        const token: string = await authService.verifyOtp(mobileNo, otp);
        console.log("token :>> ", token);
        if (token != "") {
          const token = await jwtUtils.createJwtToken(checkMobileNo);
          let result = {
            ...checkMobileNo._doc,
            token,
          };
          return messageUtils.success(result);
        } else {
          throw new Error("otp is invalid");
        }
      }
    } catch (err) {
      return messageUtils.error(err.code, err.message);
    }
  }

  /**
   * update user profile
   * @param {*} event
   */
  public async userProfileUpdate(event: any) {
    const profileData: profileUpdateDTO = JSON.parse(event.body);
    const {
      user: { _id },
    }: any = event;
    const profileUpdate = await this.update(_id, profileData);
    if (profileUpdate) {
      return messageUtils.success(profileUpdate);
    } else {
      throw new Error("profile is not update");
    }
  }

  public async loginUser(event: any) {
    console.log("true :>> ", true);
    const { mobileNo } = JSON.parse(event.body);
    const checkmobileNo: any = await this.findByMobileNO(mobileNo);
    if (checkmobileNo) {
      const otp = await otpUtils.OTP();
      await authService.createotp(checkmobileNo._id, otp);
      const token = jwtUtils.createJwtToken(checkmobileNo);
      let result = {
        ...checkmobileNo._doc,
        token,
        otp,
      };
      return messageUtils.success(result);
    } else {
      throw new Error("mobile Number not found");
    }
  }

}
