import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      default:null
    },
    lastName: {
      type: String,
      default:null
    },
    mobileNo: {
      type: String,
      unique:true
    },
    email: {
      type: String,
      default:null
    },
    contryCode: {
      type: String,
      default:'+91'
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
export default User;
