import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/").post(verifyToken, sendMessage);
router.route("/:chatId").get(verifyToken, getMessages);


export default router;