import { Box } from "@mui/material";
import React, { FC } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface UserBadgeItemProps {
  user: any;
  handleFunction: () => void;
}

const UserBadgeItem: FC<UserBadgeItemProps> = ({ user, handleFunction }) => {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: "lg",
        margin: 1,
        marginBottom: 1,
        fontSize: 14,
        color: "purple",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",

      }}
      onClick={handleFunction}
    >
        {user.username}
        <CloseIcon  />
    </Box>
  );
};

export default UserBadgeItem;