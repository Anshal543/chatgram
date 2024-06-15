import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import asyncHandler from "express-async-handler";
import { customError } from "../utils/customError.js";

export const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) throw customError("User ID is required", 400);

    const isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: req.user._id } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    const getIsChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username email profilePic",
    });
    if (getIsChat.length > 0) {
        res.send(getIsChat[0]);
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [userId, req.user._id],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const chat = await Chat.findById(createdChat._id).populate(
                "users",
                "-password"
            );
            res.send(chat);
        } catch (error) {
            throw customError("Chat could not be created", 500);
        }
    }
});

export const fetchChats = asyncHandler(async (req, res) => {
    const chats = await Chat.find({
        users: { $elemMatch: { $eq: req.user._id } },
    })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate("groupAdmin", "-password")
        .sort({ updatedAt: -1 });

    const populatedChats = await User.populate(chats, {
        path: "latestMessage.sender",
        select: "username email profilePic",
    });
    res.send(populatedChats);
});
