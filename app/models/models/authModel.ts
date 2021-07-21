import { Schema, model } from "mongoose";

const AuthTokenSchema = new Schema(
  {
    otp: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    expiresAt: {
      type: Date,
      default: Date.now(),
      index: { expires: "10m" },
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

const AuthToken = model("AuthToken", AuthTokenSchema);
export default AuthToken;
