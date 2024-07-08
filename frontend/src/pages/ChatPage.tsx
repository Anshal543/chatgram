import { useUser } from "../context/UserContext";
import SideDrawer from "../components/layout/SideDrawer";
import { Box } from "@mui/material";
import MyChats from "../components/layout/MyChats";
import ChatBox from "../components/layout/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const { user, loading }: any = useUser();
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  if (loading) return <div>Loading...</div>;
  if (!user) window.location.href = "/";
  return (
    <div style={{ width: "100vw" }}>
      {user && <SideDrawer />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "90vh",
          padding: "10px",
        }}
      >
        {user && <MyChats   fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatPage;
