export class GenerateOTP {
  static async OTP() {
    return Math.floor(1000 + Math.random() * 9000);
  }
}

export default GenerateOTP;
