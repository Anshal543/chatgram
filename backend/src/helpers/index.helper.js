// export const leaveGroup = asyncHandler(async (req, res) => {
//     const { chatId } = req.body;
//     const leftGroup = await Chat.findByIdAndUpdate(
//         chatId,
//         {
//             $pull: { users: req.user._id },
//         },
//         { new: true }
//     )
//         .populate("users", "-password")
//         .populate("groupAdmin", "-password");

//     if (!leftGroup) throw customError("Could not leave group", 500);
//     res.send(leftGroup);
// });