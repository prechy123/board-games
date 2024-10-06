import { Router } from "express";
import * as authController from "../controllers/auth.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgetPassword);
router.post("/reset-password/:token", authController.resetPassword);

export default router;
