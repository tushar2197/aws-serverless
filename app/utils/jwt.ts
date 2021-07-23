import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRATE;

export class JWT {
  static async createJwtToken(user: any) {
    let token = jwt.sign(
      { _id: user?.id, mobileNo: user.mobileNo },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }
}

export default JWT;
