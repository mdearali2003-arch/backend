import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "../user/user.service";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req, res, next) => {
  const result = await UserService.createAdminIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin  Created Successfully",
    data: result,
  });
});
const createUser = catchAsync(async (req, res, next) => {
  const result = await UserService.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User  Created Successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createUser,
};
