import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

const ProfileModel = ({ user, children }: { user: any, children?: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <IconButton onClick={handleOpen}>
          <VisibilityIcon />
        </IconButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              textTransform: "uppercase",
              fontSize: "30px",
              fontFamily: "Work sans",
              display: "flex",
              justifyContent: "center",
              // backgroundColor: "red",
            }}
          >
            {user.username}
          </Typography>
          <Box
            component="img"
            sx={{
              height: 120,
              width: 120,
              borderRadius: "50%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 2,
            }}
            alt="User Profile"
            src={user.profilePic} // Replace with the actual image URL
          />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Work sans",
              fontSize: "20px",
            }}  
          >
            {user.email}
          </Typography>
        </Box>
        
      </Modal>
    </>
  );
};

export default ProfileModel;
