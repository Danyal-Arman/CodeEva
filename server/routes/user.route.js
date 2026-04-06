import {Router} from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getUserData } from "../controllers/user.controller.js"
import { updateUserProfile } from "../controllers/user.controller.js"
import { getUserStats } from "../controllers/user.controller.js"

const router = Router()


router.get("/",isAuthenticated, getUserData);
router.put("/profile",isAuthenticated, updateUserProfile);
router.get("/stats",isAuthenticated, getUserStats);

export default router; 