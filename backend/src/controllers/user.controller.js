import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { customError } from "../utils/customError.js";

// export const getAllUsers = asyncHandler(async (req, res) => {
//     const keyword = req.query.search;
//     const loggedInUser = req.user._id;

//     const users = await User.find({
//         $and: [
//             {
//                 $or: [
//                     { username: { $eq: keyword } },
//                     { email: { $eq: keyword } }
//                 ]
//             }, {
//                 _id: { $ne: loggedInUser }
//             }
//         ]
//     })
//     if(!users){
//         throw customError("No user found", 404)
//     }
//     if(users.length>1){
//         throw customError("Multiple users found", 400)
//     }
//     const { password, ...rest } = users[0]._doc;
//     res.json(rest);
// })

export const getAllUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search;
    const loggedInUser = req.user._id;

    // Search for users matching the keyword in username or email, excluding the logged-in user
    const users = await User.find({
        $and: [
            {
                $or: [
                    { username: { $regex: keyword, $options: "i" } },
                    { email: { $regex: keyword, $options: "i" } } // Changed from $eq to $regex to allow partial matches
                ]
            },
            {
                _id: { $ne: loggedInUser }
            }
        ]
    });

    if (!users || users.length === 0) {
        throw customError("No user found", 404);
    }

    // Remove the password field from each user object
    const sanitizedUsers = users.map(user => {
        const { password, ...rest } = user._doc;
        return rest;
    });

    res.json(sanitizedUsers);
});
