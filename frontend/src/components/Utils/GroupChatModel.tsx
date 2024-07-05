import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GroupChatModel = ({ children }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { user }: any = useUser();
  const { chats, setChats }: any = useChat();

  const handleSearch = async (e) => {
    setSearch(e);
    if (!e) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user?search=${search}`
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {}
  };

  const handleSubmit = async () => {};

  return (
    <div>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontSize: "35px",
              fontFamily: "Work sans",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Create Group
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <FormControl>
              <TextField
                placeholder="chat name"
                sx={{ marginBottom: 3 }}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <TextField
                placeholder="add users"
                sx={{ marginBottom: 1 }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Button onClick={handleSubmit}>Button</Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default GroupChatModel;
