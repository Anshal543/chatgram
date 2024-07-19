import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useUser } from "../../context/UserContext";
import { Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import axios from "axios";
import { deepOrange } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import ChatLoading from "../Utils/ChatLoading";
import { getSender } from "../../config/ChatLogics";
import GroupChatModel from "../Utils/GroupChatModel";

interface MyChatsProps {
  fetchAgain: boolean;
}

const MyChats = ({fetchAgain}:MyChatsProps) => {
  const { selectedChat, setSelectedChat, chats, setChats }: any = useChat();
  const { user }: any = useUser();
  const [loggedInUser, setLoggedInUser] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [onlineUsers, setOnlineUsers] = React.useState([]);


  const handleSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  // useEffect(()=>{
  //   socket.on("onlineusers", (users:any) => {
  //     console.log(users);
  //     setOnlineUsers(users);});
  // },[onlineUsers])
  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/chat`
      );
      const data = response.data;
      setChats(Array.isArray(data) ? data : []);
    } catch (error) {
      handleSnackbar("Error occurred while fetching chats. Please try again.");
    }
  };

  useEffect(() => {
    setLoggedInUser(user.rest);
    fetchChats();
  }, [fetchAgain]);

  // useEffect(() => {
  // }, [chats]);

  return (
    <>
      <Box
        sx={{
          display: {
            xs: selectedChat ? "none" : "flex",
            sm: "flex",
          },
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          width: { xs: "100%", sm: "31%" },
          borderRadius: "lg",
          borderWidth: 1,
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            paddingX: 0,
            paddingBottom: 3,
            fontSize: { xs: "25px", md: "17px", lg: "24px" },
            fontFamily: "Work sans",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          My Chats
          <GroupChatModel>
            <Button
              sx={{
                display: "flex",
                fontSize: { xs: "17px", md: "17px", lg: "17px" },
                fontFamily: "Work sans",
                backgroundColor: "#e8eaf6",
                color: "black",
              }}
              endIcon={<AddIcon />}
            >
              Create Group
            </Button>
          </GroupChatModel>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "#f8f8f8",
            width: "100%",
            height: "100%",
            borderRadius: "lg",
            overflowY: "hidden",
          }}
        >
          {chats ? (
            <Stack sx={{ overflowY: "scroll" }}>
              {chats.map((chat: any) => (
                <Box
                  key={chat._id}
                  sx={{
                    cursor: "pointer",
                    bgcolor:
                      selectedChat?._id === chat._id
                        ? deepOrange[100]
                        : "white",
                    color:
                      selectedChat?._id === chat._id
                        ? deepOrange[500]
                        : "black",
                    paddingX: 3,
                    paddingY: 2,
                    borderRadius: "lg",
                  }}
                  onClick={() => setSelectedChat(chat)}
                >
                  <Typography>
                    {!chat.isGroupChat
                      ? getSender(loggedInUser, chat.users)
                      : chat.chatName }
                      {/* <span>{onlineUsers.includes(getOnlineUser(user.rest,selectedChat.users)) ? " online" : null}</span> */}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default MyChats;
