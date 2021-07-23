class UserDTO {
    mobileNo: string;
}

class verifyOtpDTO {
    mobileNo: string;
    otp: number;
}
class profileUpdateDTO {
    firstName: string;
    lastName: string;
    email: string;
}

export { UserDTO, verifyOtpDTO,profileUpdateDTO };
