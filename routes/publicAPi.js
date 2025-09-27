import express from "express";
import { registerController, loginController } from "../controller/userController.js";
import { loginRateLimiter } from "../controller/rateLimiter.js";
import { loginAdminController } from "../controller/adminController.js";

const publicRouter = express.Router();
publicRouter.route('/api/user/auth/register').post(registerController);
publicRouter.route('/api/user/auth/login').post(loginRateLimiter, loginController);
publicRouter.route('/api/admin/login').post(loginRateLimiter, loginAdminController)
export {
    publicRouter
}