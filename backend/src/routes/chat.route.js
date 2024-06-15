import { Router } from "express";
import { accessChat, fetchChats } from "../controllers/chat.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyToken, fetchChats);
router.route("/").post(verifyToken, accessChat);

export default router;