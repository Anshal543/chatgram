import { Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: SyntheticEvent ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          borderWidth:"5px"
        }}
      >
        <Tooltip title="Search User" placement="right-end">
          <Button
            variant="text"
            sx={{ color: "black", paddingX: 3 }}
            startIcon={<SearchIcon />}
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
        aria-label="menu"
        onClick={handleClick}
      >
        <NotificationsIcon />
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
      </Box>
    </>
  );
};

export default SideDrawer;
