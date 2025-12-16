import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }

  const jwtPayload = {
    _id: user.id,
    email: user.email,
    role: user.role,
  };

  // Access Token
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1d", // e.g. "15m"
  });

  // Refresh Token
  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {
    expiresIn: "365d", // e.g. "7d"
  });

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const refreshAccessToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email, iat } = decoded;

  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (
    user.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const jwtPayload = {
    _id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1d",
  });

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshAccessToken,
};
