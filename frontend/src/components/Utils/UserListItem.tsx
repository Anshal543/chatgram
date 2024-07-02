import { Avatar, Box, Typography } from "@mui/material";

const UserListItem = ({ data, handleFunction }:any)=> {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.8, background: "#38B2AC", color: "white" },
        marginBottom: 2,
        paddingX: 2,
        paddingY: 2,
        backgroundColor: "#E8E8E8",
        color: "black",
        width: "100%",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Avatar
        sx={{ marginRight: 2 }}
        alt={data.username}
        src={data.profilePic}
      />
      <Box>
        <Typography>{data.username}</Typography>
        <Typography fontSize="small">
          <b>Email: </b>
          {data.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
