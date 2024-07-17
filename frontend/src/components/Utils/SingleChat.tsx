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
import React, { useEffect, useMemo, useState } from "react";
import { getOnlineUser, getSender, getSenderFull } from "../../config/ChatLogics";
import { useChat } from "../../context/ChatContext";
import { useUser } from "../../context/UserContext";
import UpdateGroupChatModel from "../layout/UpdateGroupChatModel";
import ProfileModel from "./ProfileModel";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../../animation/typing.json";

interface SingleChatProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

// const ENDPOINT = "http://localhost:8080";
let socket: any;
let selectedChatCompare: any;

const SingleChat = ({ fetchAgain, setFetchAgain }: SingleChatProps) => {
  const { user }: any = useUser();
  const { selectedChat, setSelectedChat,notification,setNotification }: any = useChat();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [messages, setMessages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [newMessage, setNewMessage] = React.useState<string>("");
  const [socketConnected, setSocketConnected] = React.useState<boolean>(false);
  const [typing, setTyping] = React.useState<boolean>(false);
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = React.useState([]);

  useEffect(() => {
    socket = io("http://localhost:8080",{
      query:{userId:user?.rest?._id}
    });
    socket.emit("setup", user?.rest?._id);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // socket.on("online", (user:any) => {
    //   setOnlineUsers((prevUsers)=>[...prevUsers, user]);
    // });
    // socket.on("offline", (user:any) => {
    //   setOnlineUsers((prevUsers)=>prevUsers.filter((u:any)=>u!==user));
    // });
    socket.on("onlineusers", (users:any) => {
      console.log(users);
      setOnlineUsers(users);
    });
    
    return () => {
      socket.disconnect();}
  }, [user?.rest]);
  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    // TODO: typing indicator
    if(!socketConnected) return;
    if (e.target.value !== "" && !typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let currentTime = new Date().getTime();
    setTimeout(()=>{
      let timeDiff = new Date().getTime() - currentTime;
      if(timeDiff >= 2000 && typing){
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, 2000);
  };
;
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/message/${selectedChat._id}`
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to fetch messages");
    }
  };
  console.log(onlineUsers)
  React.useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message received", (newMessage: any) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        if(!notification.includes(newMessage)){
          setNotification([...notification, newMessage]);
          setFetchAgain(!fetchAgain);
        }
        
      } else {
        setMessages([...messages, newMessage]);
      }
   
    });
  });
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
        socket.emit("new messages", data);
      } catch (error) {
        console.log(error);
        setSnackbarOpen(true);
        setSnackbarMessage("Failed to send message");
      }
    }
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
                 {onlineUsers.includes(getOnlineUser(user.rest,selectedChat.users)) ? "🟢" : "🔴"}
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
                  fetchMessages={fetchMessages}
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
                <ScrollableChat messages={messages} />
              </Box>
            )}{
              isTyping && (
                <div>
                  <Lottie
                    animationData={animationData}
                    style={{ width: "70px", height: "50px" }}
                   />
                </div>
              ) 

            }
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
