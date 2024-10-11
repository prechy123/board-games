import { Router } from "express";
import * as userController from "../controllers/user.js";

const router = Router();

router.post("/update-profile", userController.updateProfile);

export default router;
