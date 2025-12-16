import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  //set refreshToken in cookie
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshAccessToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh-token is retrieved successfully!",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
