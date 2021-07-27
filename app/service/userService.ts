import { ObjectId } from "mongoose";
import { UserDTO } from "../models";
import { Types } from "mongoose";
import { userModel } from "../models";
import { MobileNoCheckUtils } from '../utils'
class UserService {
  /**
   * Create book
   * @param params
   */
  protected async createUser(params: UserDTO): Promise<any> {
    try {
      const { mobileNo } = params;

      const mobileNoCheck = await MobileNoCheckUtils.verify(mobileNo);
      if (mobileNoCheck === false)
        throw new Error(
          'mobile no is invalid please enter valid mobileNumber',
        );
      const checkMobile: any = await this.findByMobileNO(mobileNo);
      if (checkMobile) {
        throw new Error("mobile no already exists");
      } else {
        const result = await userModel.create({
          mobileNo: params?.mobileNo,
        });
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  protected async findByID(id: string): Promise<any> {
    try {
      const userFind = await userModel.findById(Types.ObjectId(id));
      return userFind;
    } catch (err) {
      throw err;
    }
  }
  public async findByMobileNO(number: string): Promise<any> {
    try {
      const userFindByMobile = await userModel.findOne({ mobileNo: number });
      if (userFindByMobile) {
        return userFindByMobile;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
  protected async update(userId: ObjectId, profiledata: object): Promise<any> {
    try {
      const updateResponse: any = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          ...profiledata,
        }
      );
      if (updateResponse.modify > 0) {
        return updateResponse;
      } else {
        throw new Error("profile update failed");
      }
    } catch (err) {
      throw err;
    }
  }
}
export default UserService;
