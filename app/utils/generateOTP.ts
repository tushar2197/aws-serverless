class GenerateOTP {
  static async OTP() {
    return Math.floor(100000 + Math.random() * 9000);
  }
}

export default GenerateOTP;
