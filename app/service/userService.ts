import { Model } from "mongoose";
import { UserDTO } from "../models";

class UserService {
  private user: Model<any>;
  constructor(user: Model<any>) {
    this.user = user;
  }

  /**
   * Create book
   * @param params
   */
  protected async createUser(params: UserDTO): Promise<any> {
    try {
      const { mobileNo } = params;
      const checkMobile: any = await this.findByMobileNO(mobileNo);
      console.log("checkMobile :>> ", checkMobile);
      if (checkMobile) {
        throw new Error("mobile no already exists");
      } else {
        const result = await this.user.create({
          mobileNo: params?.mobileNo,
        });
        return result;
      }
    } catch (err) {
      console.error(err);

      throw err;
    }
  }
  protected async findByID(id): Promise<object> {
    try {
      const userFind = await this.user.findById(id);
      return userFind;
    } catch (err) {
      throw err;
    }
  }
  protected async findByMobileNO(number): Promise<any> {
    try {
      const userFindByMobile = await this.user.findOne({ mobileNo: number });
      if (userFindByMobile) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
}
export default UserService;
