import { Router } from "express";
import { loginUser, logoutUser, registerUser, resetPassword, sendResetPasswordOtp, sendVerifyOtp, verifyEmail, verifyResetPasswordOtp, googleAuth } from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", isAuthenticated, logoutUser)
router.post("/send-verify-otp", isAuthenticated, sendVerifyOtp)
router.post("/verify-email", isAuthenticated, verifyEmail)
router.post("/request-password-reset", sendResetPasswordOtp);
router.post("/verify-reset-otp", verifyResetPasswordOtp)
router.post("/reset-password", resetPassword)
router.post("/google", googleAuth)

export default router;   