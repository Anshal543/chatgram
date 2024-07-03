export const getSender = (loggedInUser: any, users: any) => {
    return users[0]._id === loggedInUser._id ? users[1].username : users[0].username;
};