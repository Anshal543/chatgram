import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deepOrange } from "@mui/material/colors";
import { useUser } from "../../context/UserContext";

const SideDrawer = () => {
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
          <IconButton sx={{padding: 1, borderRadius: "20%"}}
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
            <MenuItem onClick={handleCloseProfile}>My Profile</MenuItem>
            <MenuItem onClick={handleCloseProfile}>Logout</MenuItem>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
