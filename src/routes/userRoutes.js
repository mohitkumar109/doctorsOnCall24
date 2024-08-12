import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", protect, userController.getUser);
router.patch("/updateUser", protect, userController.updateUser);
router.post("/logout", protect, userController.logoutUser);

export default router;
