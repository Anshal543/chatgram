// export const leaveGroup = asyncHandler(async (req, res) => {
//     const { chatId } = req.body;

//     const chat = await Chat.findById(chatId);

//     if (!chat) throw customError("Group not found", 404);

//     const isAdmin = chat.groupAdmin === req.user._id;

//     if (isAdmin) {
//         const remainingUsers = chat.users.filter(userId => userId !== req.user._id);

//         if (remainingUsers.length === 0) {
//             await Chat.findByIdAndDelete(chatId);
//             return res.send({ message: "Group deleted as no users are left" });
//         } else {
//             chat.groupAdmin = remainingUsers[0];
//         }
//     }

//     const leftGroup = await Chat.findByIdAndUpdate(
//         chatId,
//         {
//             $pull: { users: req.user._id },
//             groupAdmin: chat.groupAdmin
//         },
//         { new: true }
//     )
//         .populate("users", "-password")
//         .populate("groupAdmin", "-password");

//     if (!leftGroup) throw customError("Could not leave group", 500);

//     res.send(leftGroup);
// });