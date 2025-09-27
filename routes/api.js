import express from "express";
import { getUserMeController } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { listingUser, loginAdminController } from "../controller/adminController.js";
const router = express.Router();

router.use(authMiddleware);
router.route('/api/user/me').get(getUserMeController);
router.route('/api/admin/listing-user').get(listingUser)
export {
    router
}