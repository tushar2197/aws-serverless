import { Model } from 'mongoose';
import { userDTO } from '../models/dto/userDTO';

export class UserService {
  private user: Model<any>;
  constructor(user: Model<any>) {
    this.user = user;
  }

  /**
   * Create book
   * @param params
   */
  protected async createUser (params: userDTO): Promise<object> {
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

  
}
