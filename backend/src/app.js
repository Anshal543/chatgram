import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("./public"))
app.use(cookieParser())

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import chatRouter from "./routes/chat.route.js"

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/chat", chatRouter)



export { app }