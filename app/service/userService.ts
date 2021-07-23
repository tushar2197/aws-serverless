import { Model, ObjectId } from 'mongoose';
import { UserDTO } from '../models';
import { Types } from 'mongoose';

class UserService {
    private user: Model<any>;

    /**
     * Create book
     * @param params
     */
    protected async createUser(params: UserDTO): Promise<any> {
        try {
            const { mobileNo } = params;
            const checkMobile: any = await this.findByMobileNO(mobileNo);
            console.log('checkMobile :>> ', checkMobile);
            if (checkMobile) {
                throw new Error('mobile no already exists');
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
    protected async findByID(id: string): Promise<any> {
        try {
            const userFind = await this.user.findById(Types.ObjectId(id));
            return userFind;
        } catch (err) {
            throw err;
        }
    }
    public async findByMobileNO(number: string): Promise<any> {
        try {
            const userFindByMobile = await this.user.findOne({
                mobileNo: number,
            });
            if (userFindByMobile) {
                return userFindByMobile;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    }
    protected async update(
        userId: ObjectId,
        profiledata: object,
    ): Promise<any> {
        try {
            const updateResponse = await this.user.findByIdAndUpdate(
                { _id: userId },
                {
                    ...profiledata,
                },
            );
            if (updateResponse.modify > 0) {
                return updateResponse;
            } else {
                throw new Error('profile update failed');
            }
        } catch (err) {
            throw err;
        }
    }
}
export default UserService;
