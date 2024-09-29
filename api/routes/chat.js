import { Router } from "express";
import { getChats, getChat, addChat, readChat} from "../controllers/chat.js";
import { verifyToken } from "../middleware/verify-token.js";

const router = Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);

export default router;
