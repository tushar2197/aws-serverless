import { Model } from "mongoose";
import { userDto } from "../models";

class UserService {
  private user: Model<any>;
  constructor(user: Model<any>) {
    this.user = user;
  }

  /**
   * Create book
   * @param params
   */
  protected async createUser(params: userDto): Promise<object> {
    try {
      const result = await this.user.create({
        mobileNo: params?.mobileNo,
      });
      return result;
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
  protected async findByMobileNO(number): Promise<object> {
    try {
      const userFindByMobile = await this.user.findOne(
        { mobileNo: number },
        { raw: true }
      );
      return userFindByMobile;
    } catch (err) {
      throw err;
    }
  }
}
export default UserService