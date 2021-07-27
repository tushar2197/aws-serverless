import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },
    mobileNo: {
      type: String,
      unique: true,
      comment: "mobile number like +911234567899"
    },
    email: {
      type: String,
      default: null
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
