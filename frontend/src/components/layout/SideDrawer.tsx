import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,

  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deepOrange } from "@mui/material/colors";
import { useUser } from "../../context/UserContext";
import ProfileModel from "../Utils/ProfileModel";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ChatLoading from "../Utils/ChatLoading";
import UserListItem from "../Utils/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { user }: any = useUser();
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );

  const handleNotificationsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleProfileClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };
  console.log(user);
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/signout"
      );
      if (response.data.success) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const accessChat = async (id: string) => {
  }

  const handleSearch = async () => {
    if (!search) {
      setSnackbarMessage("Please enter a search term.");
      setSnackbarOpen(true);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/?search=${search}`
      );
      const data = response.data;
      // setSearchResult(data);
      setSearchResult(Array.isArray(data) ? data : [data]);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setSnackbarMessage("Error occurred while searching. Please try again.");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Search Result updated:", searchResult);
  }, [searchResult]);

  const DrawerList = (
    <Box sx={{ width: 250, marginLeft: 2, paddingY: 2 }} role="presentation">
      <Typography variant="h5" sx={{ textAlign: "start" }}>
        Search User
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", marginTop: 1 }}>
        <TextField
          placeholder="Search User"
          style={{ marginRight: 0, padding: 0 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="standard"
        />
        <Button
          onClick={handleSearch}
          style={{ color: "black" }}
          variant="text"
        >
          Go
        </Button>
      </Box>
      {loading ? <ChatLoading /> : (
        <List>
          {searchResult?.map((data: any) => (
            <UserListItem key={data._id} data={data}
            handleFunction={()=>accessChat(data._id)} />
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "white",
          width: "100%",
          padding: "5px 10px",
          borderWidth: "5px",
        }}
      >
        <Tooltip title="Search User" placement="right-end">
          <Button
            onClick={toggleDrawer(true)}
            variant="text"
            sx={{ color: "black", paddingX: 3 }}
            startIcon={<SearchIcon />}
            disableRipple
          >
            <Typography sx={{ display: { xs: "none", md: "flex" } }}>
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="notifications"
            onClick={handleNotificationsClick}
            disableRipple
          >
            <NotificationsIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNotifications}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotifications}
          >
            <MenuItem onClick={handleCloseNotifications}>
              Notification 1
            </MenuItem>
            <MenuItem onClick={handleCloseNotifications}>
              Notification 2
            </MenuItem>
          </Menu>
          <IconButton
            sx={{ padding: 1, borderRadius: "20%" }}
            edge="start"
            color="inherit"
            aria-label="profile"
            onClick={handleProfileClick}
            // disableRipple
          >
            <Avatar
              sizes="5px"
              sx={{
                bgcolor: deepOrange[500],
                width: 30,
                height: 30,
                fontSize: 14,
              }}
            >
              {getInitials(user.rest.username)}
            </Avatar>{" "}
            <ExpandMoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={handleCloseProfile}
          >
            {" "}
            <ProfileModel user={user.rest}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModel>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={handleSnackbarClose}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export default SideDrawer;
