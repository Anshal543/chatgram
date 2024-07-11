import VisibilityIcon from "@mui/icons-material/Visibility";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useUser } from "../../context/UserContext";
import UserBadgeItem from "../Utils/UserBadgeItem";
import UserListItem from "../Utils/UserListItem";

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

interface UpdateGroupChatModelProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  fetchMessages: () => void;
}

interface SearchResultType {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
}

// interface grouupAdminType {
//   _id: string
// }
const UpdateGroupChatModel = ({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}: UpdateGroupChatModelProps) => {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = React.useState("");
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat }: any = useChat();
  const { user }: any = useUser();
  // console.log(user);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(selectedChat);
  // console.log(selectedChat.groupAdmin._id );
  // console.log(user._id);

  const handleRemove = async (user1: any) => {
    if (
      selectedChat.groupAdmin._id !== user.rest._id &&
      user1._id !== user.rest._id
    ) {
      setSnackbarOpen(true);
      setSnackbarMessage(
        "Only Group Admin can remove users from the group chat"
      );
      return;
    }
    try {
      // API call to remove user from group chat
      setLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/chat/group/remove`,
        { chatId: selectedChat._id, userId: user1._id }
      );
      user1._id === user.rest._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setSnackbarOpen(true);
      setSnackbarMessage("User Removed from Group Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSnackbarOpen(true);
      setSnackbarMessage("Error Removing User from Group");
    }
  };
  const handleAddUser = async (user1: any) => {
    if (selectedChat.users.find((u: any) => u._id === user1._id)) {
      setSnackbarOpen(true);
      setSnackbarMessage("User already in the group chat");
      return;
    }
    if (selectedChat.groupAdmin._id !== user.rest._id) {
      setSnackbarOpen(true);
      setSnackbarMessage("Only Group Admin can add users to the group chat");
      return;
    }

    try {
      // API call to add user to group chat
      setLoading(true);

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/chat/group/add`,
        { chatId: selectedChat._id, userId: user1._id }
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setSnackbarOpen(true);
      setSnackbarMessage("User Added to Group Successfully");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSnackbarOpen(true);
      setSnackbarMessage("Error Adding User to Group");
    }
  };
  const handleRename = async () => {
    if (groupChatName === "") {
      setSnackbarOpen(true);
      setSnackbarMessage("Group Chat Name Cannot be Empty");
      setRenameLoading(false);
      return;
    }
    try {
      // API call to update group chat name
      setRenameLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/chat/group/rename`,
        { chatName: groupChatName, chatId: selectedChat._id }
      );
      setSnackbarOpen(true);
      setSnackbarMessage("Group Chat Name Updated Successfully");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setGroupChatName("");
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarMessage("Error Updating Group Chat Name");
      setRenameLoading(false);
      setGroupChatName("");
    }
  };
  const handleSearch = async (e: string) => {
    setSearch(e);
    if (!search) {
      setSnackbarMessage("Please enter a search term.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/?search=${search}`
      );
      const data = response.data;
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setSnackbarMessage("Error occurred while searching. Please try again.");
      setLoading(false);
    }
  };

  const handleLeaveGroup = async (user: any) => {
    if (selectedChat.groupAdmin._id === user.rest._id) {
      setSnackbarOpen(true);
      setSnackbarMessage("Group Admin cannot leave the group chat");
      return;
    }
    try {
      // API call to leave group chat
      setLoading(true);
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/chat/group/leave`, {
        chatId: selectedChat._id,
      });
      setSelectedChat();
      setFetchAgain(!fetchAgain);
      setSnackbarOpen(true);
      setSnackbarMessage("Left Group Chat Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSnackbarOpen(true);
      setSnackbarMessage("Error Leaving Group Chat");
    }
  };
  return (
    <>
      <IconButton sx={{ display: { xs: "flex" } }} onClick={handleOpen}>
        <VisibilityIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            display={"flex"}
            justifyContent={"center"}
            sx={{ fontSize: "35px", fontFamily: "Work sans" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {selectedChat.chatName.toUpperCase()}
          </Typography>
          <Box display={"flex"} flexWrap={"wrap"} pb={3} width={"100%"}>
            {selectedChat.users.map((user: any) => (
              <UserBadgeItem
                user={user}
                key={user._id}
                handleFunction={() => handleRemove(user)}
              />
            ))}
          </Box>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              label="Group Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <LoadingButton
              loading={renameloading}
              variant="contained"
              sx={{ marginLeft: 0 }}
              onClick={handleRename}
            >
              Update
            </LoadingButton>
          </FormControl>
          <FormControl sx={{ display: "flex" }}>
            <TextField
              size="small"
              variant="outlined"
              label="Add User"
              sx={{ marginBottom: 2 }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          {loading ? (
            <CircularProgress />
          ) : (
            searchResult?.map((user: any) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
          <Button onClick={() => handleLeaveGroup(user)}>Leave Group</Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default UpdateGroupChatModel;
