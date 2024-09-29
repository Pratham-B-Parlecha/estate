import { Router } from "express";
import { addMessage } from "../controllers/message.js";
import { verifyToken } from "../middleware/verify-token.js";


const router = Router();

router.post("/:chatId",verifyToken, addMessage)

export default router;