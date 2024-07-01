import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { deepOrange } from "@mui/material/colors";
  import React, { MouseEvent, useState } from "react";
  import ProfileModel from "../Utils/ProfileModel";
  import axios from "axios";
  import { useUser } from "../../context/UserContext";
  
  const ProfileMenu = () => {
    const { user }: any = useUser();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleProfileClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
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
  
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("");
    };
  
    return (
      <>
        <IconButton
          sx={{ padding: 1, borderRadius: "20%" }}
          edge="start"
          color="inherit"
          aria-label="profile"
          onClick={handleProfileClick}
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
          </Avatar>
          <ExpandMoreIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <ProfileModel user={user.rest}>
            <MenuItem>My Profile</MenuItem>
          </ProfileModel>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  };
  
  export default ProfileMenu;
  