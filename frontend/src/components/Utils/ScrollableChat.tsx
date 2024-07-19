import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../config/ChatLogics";
import { useUser } from "../../context/UserContext";
import { Avatar, Tooltip } from "@mui/material";
import {format} from 'timeago.js'
import { create } from "@mui/material/styles/createTransitions";

const ScrollableChat = ({ messages }: any) => {
  const { user }: any = useUser();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m: any, i: number) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user.rest._id) ||
              isLastMessage(messages, i, user.rest._id)) && (
              <Tooltip title={m.sender.username}>
                <Avatar
                  alt={m.sender.username}
                  src={m.sender.profilePic}
                  style={{
                    marginRight: "10px",
                    marginTop: "7px",
                    cursor: "pointer",
                  }}
                ></Avatar>
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.rest._id ? "#bee3f8" : "#b9f5d0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth:"75%",
                marginLeft:isSameSenderMargin(messages, m, i, user.rest._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
              }}
            >
              {m.content}
              <div style={{fontSize:13}}>
              {format(m.createdAt)}
              </div>
                
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
