import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    List,
    Snackbar,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import axios from "axios";
  import ChatLoading from "../Utils/ChatLoading";
  import UserListItem from "../Utils/UserListItem";
  
  const SearchUserDrawer = ({
    open,
    toggleDrawer,
    handleSnackbar,
    handleChatAccess,
    loadingChat
  }: any) => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
  
    const handleSearch = async () => {
      if (!search) {
        handleSnackbar("Please enter a search term.");
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
        handleSnackbar("Error occurred while searching. Please try again.");
        setLoading(false);
      }
    };
  
    return (
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300, marginLeft: 0, padding: 2 }} role="presentation">
          <Typography variant="h5" sx={{ textAlign: "start" }}>
            Search User
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", marginTop: 1 }}>
            <TextField
              placeholder="Search User"
              style={{ width: "100%", padding: "0 5px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="standard"
            />
            <Button onClick={handleSearch} style={{ color: "black" }} variant="text">
              Go
            </Button>
          </Box>
          {loading ? (
            <ChatLoading />
          ) : (
            <List>
              {searchResult?.map((data: any) => (
                <UserListItem
                  key={data._id}
                  data={data}
                  handleFunction={() => handleChatAccess(data._id)}
                />
              ))}
            </List>
          )}
          {loadingChat && <CircularProgress size={40} thickness={2} color="primary" />}
        </Box>
      </Drawer>
    );
  };
  
  export default SearchUserDrawer;
  