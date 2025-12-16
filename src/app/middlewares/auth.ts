import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if the token is not provided from the client
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route"
      );
    }
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    } catch (error) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route"
      );
    }
    const { role, email, iat } = decoded;
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      }
    }
    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangeAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route"
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
