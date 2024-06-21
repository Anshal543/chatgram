import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { customError } from "../utils/customError.js";
import asyncHandler from "express-async-handler";

export const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;
    if (!chatId || !content) {
        throw customError("Chat ID and content are required", 400);
    }
    const { _id: senderId } = req.user;
    try {
        let newMessage = await Message.create({
            sender: senderId,
            chat: chatId,
            content,
        });
        // newMessage = await newMessage.populate("sender", "username profilePic");
        newMessage = await Message.findById(newMessage._id)
            .populate("chat")
            .populate("sender", "username profilePic");
        newMessage = await User.populate(newMessage, {
            path: "chat.users",
            select: "username email profilePic",
        });
        await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });
        res.status(201).json(newMessage);
    } catch (error) {
        throw customError("Failed to send message", 500);
    }
});

export const getMessages = asyncHandler(async (req, res) => {

});
