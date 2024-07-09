import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useChat } from "../../context/ChatContext";
import UserBadgeItem from "../Utils/UserBadgeItem";

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

const UpdateGroupChatModel = ({
  fetchAgain,
  setFetchAgain,
}: UpdateGroupChatModelProps) => {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = React.useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat }: any = useChat();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = (user: any) => {};
  const handleRename = () => {};
  const handleSearch = () => {};
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
              variant="outlined"
              label="Group Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ marginLeft: 0 }}
              onClick={handleRename}
            >
              Update
            </Button>
          </FormControl>
          <FormControl sx={{ display: "flex" }}>
            <TextField
              variant="outlined"
              label="Group Chat Name"
              sx={{ marginBottom: 2 }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
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
