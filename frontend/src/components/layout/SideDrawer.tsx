import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deepOrange } from "@mui/material/colors";
import { useUser } from "../../context/UserContext";
import ProfileModel from "../Utils/ProfileModel";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

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
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/search?search=${search}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const DrawerList = (
    <Box sx={{ width: 250, display: "flex" }} role="presentation">
      <TextField
        placeholder="Search by name or email"
        style={{ marginRight: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
      />
      <Button onClick={handleSearch}>Go</Button>
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
    </>
  );
};

export default SideDrawer;
