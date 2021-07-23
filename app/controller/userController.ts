import { Model } from 'mongoose';
import { messageUtils, otpUtils } from '../utils';
import userService from '../service/userService';
import AuthService from '../service/authservice';
import { UserDTO, verifyOtpDTO, profileUpdateDTO } from '../models';
export class UserController extends userService {
    auth = new AuthService();
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
                await this.auth.createotp(result._id, otp);
                let result1 = {
                    ...result._doc,
                    otp,
                };

                return messageUtils.success(result1);
            } else {
                throw new Error('user is not created');
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
                throw new Error('mobile no is not found');
            } else {
                const verifyOtp = await this.auth.verifyOtp(mobileNo, otp);
                if (verifyOtp) {
                    return messageUtils.success(checkMobileNo);
                } else {
                    throw new Error('otp is invalid');
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
            throw new Error('profile is not update');
        }
    }
}
