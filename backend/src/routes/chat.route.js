import { Router } from "express";
import {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyToken, fetchChats);
router.route("/").post(verifyToken, accessChat);
router.route("/group").post(verifyToken, createGroupChat);
router.route("/group/rename").put(verifyToken, renameGroup);
router.route("/group/add").put(verifyToken, addToGroup);

export default router;
