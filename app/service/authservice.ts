// import jwt from "jsonwebtoken";
import { authModel, authInterface } from "../models";
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

  // async verifyOtp(req: Request, res: Response) {
  //   try {
  //     let auth_token: any = await AuthToken.findOne({
  //       otp: req.body.otp,
  //     });

  //     if (auth_token) {
  //       let user: any = await User.findOne({ _id: auth_token.user });
  //       let token = jwt.sign(
  //         { _id: user.id, mobileNo: user.mobileNo },
  //         "secret",
  //         { expiresIn: "1d" }
  //       );
  //       await auth_token.remove();
  //       return res.status(200).json({ success: true, data: { token, user } });
  //     } else {
  //       return res
  //         .status(500)
  //         .json({ success: false, message: "Token expired!" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ success: false, message: error.message });
  //   }
  // }
}

export default AuthService;
