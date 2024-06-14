import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { customError } from "../utils/customError.js";
import asyncHandler from 'express-async-handler';

export const signUp = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw customError("User already exists", 400)
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    const { password: userPassword, ...rest } = newUser._doc;
    res.status(201).json(rest);

})

export const signIn = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const validUser = await User.findOne({ email });

    if (!validUser) {
        throw customError("Invalid credentials", 400)
    }
    const isPasswordValid = await bcrypt.compare(password, validUser.password);
    if (!isPasswordValid) {
        throw customError("Invalid credentials", 400)
    }
    const { password: userPassword, ...rest } = validUser._doc;
    const token = jwt.sign({ email: validUser.email, id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true }).json({ success: true, user: rest });
})

export const verifyUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        throw customError("Unauthorized", 401)
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw customError("Unauthorized", 401)
        }
        res.json({ success: true, user: decoded })
    })
})

export const signOut = asyncHandler(async (req, res) => {
    res.clearCookie("token").json({ success: true }).json({ success: true });
})
