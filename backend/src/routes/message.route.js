import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/").post(verifyToken, sendMessage);


export default router;