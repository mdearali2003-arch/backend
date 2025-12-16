import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    passwordChangeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// pre save middleware
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds || 10)
  );
  next();
});

// remove password after save
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// static methods
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<IUser, UserModel>("User", userSchema);
