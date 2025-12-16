import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  id?: string;
  userName: string;
  email: string;
  password: string;
  role: "superAdmin" | "admin" | "user";
  needsPasswordChange?: boolean;
  passwordChangeAt?: Date;
}

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
