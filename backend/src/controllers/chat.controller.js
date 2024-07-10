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
            const allChat = await Chat.findOne({_id:createdChat._id}).populate(
                "users",
                "-password"
            );
            res.send(allChat);
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

export const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.chatName) {
        throw customError("Please provide chat name and users", 400);
    }
    let users = req.body.users;
    if (users.length < 0) {
        throw customError("Group chat must contain more than 2 users", 400);
    }
    users.push(req.user);
    try {
        const createdGroupChat = await Chat.create({
            chatName: req.body.chatName,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user,
        });
        const fetchGroupChat = await Chat.findById(createdGroupChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(201).send(fetchGroupChat);
    } catch (error) {
        throw customError("Group chat could not be created", 500);
    }
});

export const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) throw customError("Chat not found", 404);
    res.send(updatedChat);
});

export const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const addedToChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!addedToChat) throw customError("User could not be added to chat", 500);
    res.send(addedToChat);
});

export const removeUserFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const removedFromChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removedFromChat)
        throw customError("User could not be removed from chat", 500);
    res.send(removedFromChat);
});


export const leaveGroup = asyncHandler(async (req, res) => {
    const { chatId } = req.body;
    const leftGroup = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: req.user._id },
        },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!leftGroup) throw customError("Could not leave group", 500);
    res.send(leftGroup);
});