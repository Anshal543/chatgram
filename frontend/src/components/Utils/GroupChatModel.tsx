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
import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  SyntheticEvent,
  useState,
} from "react";
import { useChat } from "../../context/ChatContext";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";

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

const GroupChatModel = ({ children }: { children: ReactNode }) => {
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

  const handleGroup = (user: any) => {
    if (selectedUsers.some((selectedUser) => selectedUser._id === user._id)) {
      setSnackbarOpen(true);
      setSnackbarMessage("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleSearch = async (e: any) => {
    setSearch(e);
    if (!e) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user?search=${search}`
      );
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      setSnackbarOpen(true);
      setSnackbarMessage("Something went wrong");
    }
  };

  const handleSubmit = async () => {
    if(!groupChatName || selectedUsers.length < 1) {
      setSnackbarOpen(true);
      setSnackbarMessage("Please fill all fields");
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/group`,
        {
          chatName: groupChatName,
          users: selectedUsers.map((user: any) => user._id),
        
        }
      );
      setChats([...chats, data]);
      setSnackbarOpen(true);
      setSnackbarMessage("Chat created successfully");
      handleClose();
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarMessage("Something went wrong");
    }
  };
  const handleDelete = (user: any) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser !== user)
    );
  };

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
            {" "}
            <Box display={"flex"} width={"100%"} flexWrap={"wrap"}>
              {selectedUsers.map((user: any) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
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
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              searchResult
                .slice(0, 2)
                .map((user: any) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
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
