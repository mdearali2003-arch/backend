import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
const router = express.Router();

router.post("/create-user", auth(USER_ROLE.admin), UserController.createUser);
router.post("/create-admin", UserController.createAdmin);

export const UserRouter = router;
