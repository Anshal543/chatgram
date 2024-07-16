import React from "react";
import { useChat } from "../../context/ChatContext";
import { Box } from "@mui/material";
import SingleChat from "../Utils/SingleChat";

interface ChatBoxProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox = ({fetchAgain,setFetchAgain}:ChatBoxProps) => {
  const { selectedChat }: any = useChat();
  return (
    <Box
      display={{ xs: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bgcolor={"white"}
      width={{ xs: "100%", md: "68%" }}
      sx={{ borderRadius: "lg", borderwidth: 1 }}
    >{
      
    }
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
