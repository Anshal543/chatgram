import { Router } from "express";
import { signUp, signIn, verifyUser, signOut } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/verify").get(verifyToken,verifyUser);
router.route("/signout").get(signOut);


export default router;