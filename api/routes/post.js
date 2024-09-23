import {Router} from 'express';
import { verifyToken } from "../middleware/verify-token.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.js';

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/",verifyToken ,addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id",verifyToken, deletePost);

export default router;