import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { customError } from "../utils/customError.js";

export const getAllUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search;
    const loggedInUser = req.user.id;

    const users = await User.find({
        $and: [
            {
                $or: [
                    { username: { $eq: keyword } },
                    { email: { $eq: keyword } }
                ]
            }, {
                _id: { $ne: loggedInUser }
            }
        ]
    })
    if(!users){
        throw customError("No user found", 404)
    }
    if(users.length>1){
        throw customError("Multiple users found", 400)
    }
    const { password, ...rest } = users[0]._doc;
    res.json(rest);
})
