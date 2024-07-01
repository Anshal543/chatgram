import React, { MouseEvent, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNotificationsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="notifications"
        onClick={handleNotificationsClick}
        disableRipple
      >
        <NotificationsIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Notification 1</MenuItem>
        <MenuItem onClick={handleClose}>Notification 2</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsMenu;
