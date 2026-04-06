import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { aiCodeSummarization, assistantAi } from "../controllers/ai.controller.js"

const router = express.Router()

router.post('/assistant', isAuthenticated, assistantAi)
router.post('/code-summarization', isAuthenticated, aiCodeSummarization)

export default router 