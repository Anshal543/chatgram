import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { useChat } from "../../context/ChatContext";
import { useUser } from "../../context/UserContext";
import UpdateGroupChatModel from "../layout/UpdateGroupChatModel";
import ProfileModel from "./ProfileModel";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";

interface SingleChatProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleChat = ({ fetchAgain, setFetchAgain }: SingleChatProps) => {
  const { user }: any = useUser();
  const { selectedChat, setSelectedChat }: any = useChat();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [messages, setMessages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [newMessage, setNewMessage] = React.useState<string>("");

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/message/${selectedChat._id}`
      );
      console.log(data);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to fetch messages");
    }
  };

  React.useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const handleSendMessage = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && newMessage !== "") {
      console.log("Sending message");
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/message/`,
          {
            chatId: selectedChat._id,
            content: newMessage,
          }
        );
        console.log(data);
        setNewMessage("");
        setMessages([...messages, data]);
        // setFetchAgain(!fetchAgain);
      } catch (error) {
        console.log(error);
        setSnackbarOpen(true);
        setSnackbarMessage("Failed to send message");
      }
    }
  };
  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    // TODO: typing indicator
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "30px" },
              paddingBottom: 3,
              paddingX: 2,
              fontFamily: "Work sans",
              width: "100%",
              display: "flex",
              justifyContent: { xs: "space-between" },
            }}
            variant="h4"
          >
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setSelectedChat(null)}
            >
              <ArrowBackIcon />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                <Typography>
                  {
                    // selectedChat.users.find((u: any) => u._id !== user?._id)
                    //   .username
                    getSender(user.rest, selectedChat.users)
                  }
                </Typography>
                <ProfileModel
                  user={getSenderFull(user.rest, selectedChat.users)}
                />
              </>
            ) : (
              <>
                <Typography>{selectedChat.chatName.toUpperCase()}</Typography>
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages = {fetchMessages}
                />
              </>
            )}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            p={3}
            bgcolor={"#e8e8e8"}
            height={"100%"}
            width={"100%"}
            sx={{ overflowY: "hidden", borderRadius: "lg" }}
          >
            {loading ? (
              <CircularProgress
                size={"5rem"}
                sx={{ alignSelf: "center", margin: "auto" }}
              />
            ) : (
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ overflowY: "scroll", scrollbarWidth: "none" }}
              >
                <ScrollableChat messages = {messages} />
              </Box>
            )}
            <TextField
              required
              sx={{ mt: 3 }}
              onKeyDown={handleSendMessage}
              placeholder="Type a message"
              onChange={typingHandler}
              value={newMessage}
            />
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
        >
          <Typography
            sx={{ paddingBottom: 3, fontFamily: "Work sans" }}
            variant="h4"
          >
            Click on a user to start chat
          </Typography>
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default SingleChat;
