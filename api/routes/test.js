import {Router} from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.js";
import { verifyToken } from "../middleware/verify-token.js";

const router = Router();

router.get("/should-be-loggedIn",verifyToken, shouldBeLoggedIn)
router.get("/should-be-admin", shouldBeAdmin)


export default router;