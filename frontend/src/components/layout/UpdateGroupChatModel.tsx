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
import React, {  useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useChat } from "../../context/ChatContext";
import UserBadgeItem from "../Utils/UserBadgeItem";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

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
}

interface SearchResultType {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
}

const UpdateGroupChatModel = ({
  fetchAgain,
  setFetchAgain,
}: UpdateGroupChatModelProps) => {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = React.useState("");
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat }: any = useChat();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = (user: any) => {};
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
      setSearchResult(Array.isArray(data) ? data : [data]);
      setLoading(false);
    } catch (error) {
      setSnackbarMessage("Error occurred while searching. Please try again.");
      setLoading(false);
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
          {
            loading ? (
              <CircularProgress />
            ):(
              <Box display={"flex"} flexWrap={"wrap"} pb={3} width={"100%"}>
                {searchResult?.map((user: any) => (
                  <UserBadgeItem
                    user={user}
                    key={user._id}
                    handleFunction={() => handleRemove(user)}
                  />
                ))}
              </Box>
            )
          }
          <Button onClick={() => handleRemove(user)}>Leave Group</Button>
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
