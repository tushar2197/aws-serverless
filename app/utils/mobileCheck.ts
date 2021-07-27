const phoneUtil =
    require('google-libphonenumber').PhoneNumberUtil.getInstance();

class MobileNoVerify {
    public async verify(mobileNo: string) {
        const number = phoneUtil.parseAndKeepRawInput(mobileNo, '');
        return phoneUtil.isValidNumber(number);
    }
}

export const MobileVerify = new MobileNoVerify();