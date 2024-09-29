import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser, savePost, profilePosts,getNoficationNumber } from "../controllers/user.js";
import { verifyToken } from "../middleware/verify-token.js";


const router = Router();

router.get("/", getUsers)
// router.get("/:id", verifyToken,getUser)
router.put("/:id", verifyToken,updateUser)
router.delete("/:id",verifyToken, deleteUser)
router.post("/save",verifyToken, savePost)
router.get("/profilePosts",verifyToken, profilePosts)
router.get("/notification", verifyToken, getNoficationNumber)

export default router;