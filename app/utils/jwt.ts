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
  static async tokenDecrypt(token: string) {
    // console.log('token :>> ', token);
    return jwt.verify(token, jwtSecret);
  }
}

export default JWT;
