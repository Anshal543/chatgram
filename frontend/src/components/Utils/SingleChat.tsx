import React from "react";
import { useChat } from "../../context/ChatContext";
import { useUser } from "../../context/UserContext";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface SingleChatProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleChat = ({ fetchAgain, setFetchAgain }: SingleChatProps) => {
  const { user }:any = useUser();
  const { selectedChat, setSelectedChat }: any = useChat();
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
                    selectedChat.users.find((u: any) => u._id !== user?._id)
                      .username
                  }
                </Typography>
              </>
            ) : (
              <Typography>{selectedChat.chatName.toUpperCase()}</Typography>
            )}
          </Typography>
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
    </>
  );
};

export default SingleChat;
