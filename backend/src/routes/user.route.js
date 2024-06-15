import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyToken, getAllUsers);


export default router;