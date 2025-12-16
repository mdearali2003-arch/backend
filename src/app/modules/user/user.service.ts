import config from "../../config";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const createAdminIntoDB = async (payload: IUser) => {
  try {
    const existingUser = await User.isUserExistsByEmail(payload.email);
    if (existingUser) {
      throw new AppError(httpStatus.CONFLICT, "Admin already exists");
    }
    const adminUser = await User.create({
      ...payload,
      role: "admin",
      needsPasswordChange: payload.needsPasswordChange || "false",
    });

    return adminUser;
  } catch (err) {
    throw err;
  }
};

const createUserIntoDB = async (payload: IUser) => {
  try {
    const existingUser = await User.isUserExistsByEmail(payload.email);
    if (existingUser) {
      throw new AppError(httpStatus.CONFLICT, "User already exists");
    }

    const newUser = await User.create({
      ...payload,
      role: "user",
      password: config.admin_password,
      email: config.admin_email,
      needsPasswordChange: payload.needsPasswordChange || "false",
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};

export const UserService = {
  createUserIntoDB,
  createAdminIntoDB,
};
