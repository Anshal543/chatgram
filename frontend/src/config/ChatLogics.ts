export const getSender = (loggedInUser: any, users: any) => {
    const user = users.find((user: any) => user._id !== loggedInUser._id);
    return user.name;
};