import React, { MouseEvent, useState } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getSender } from "../../config/ChatLogics";
import { useUser } from "../../context/UserContext";
import { useChat } from "../../context/ChatContext";

interface NotificationsMenuProps {
  notification: any;
  setNotification: React.Dispatch<React.SetStateAction<any>>;
}

const NotificationsMenu = ({
  notification,
  setNotification,
}: NotificationsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user }: any = useUser();
  const { selectedChat, setSelectedChat }:any = useChat();

  const handleNotificationsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(notification);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="notifications"
        onClick={handleNotificationsClick}
        disableRipple
      > <Badge badgeContent={notification.length} color="error" sx={{marginRight:1}}>
        <NotificationsIcon />
        </Badge>

      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          {!notification.length && "no messages "}
        </MenuItem>
        {notification.map((item: any) => (
          <MenuItem
            key={item._id}
            onClick={handleClose}
            onClickCapture={() => {
              setSelectedChat(item.chat);
              setNotification(
                notification.filter((not: any) => not._id !== item._id)
              );
            }}
          >
            {item.chat?.isGroupChat
              ? `new mesages ${item.chat.chatName}`
              : `new message from ${getSender(user.rest, item.chat?.users)}`}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationsMenu;
