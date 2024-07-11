import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }: any) => {
  return (
    <div>
      {messages &&
        messages.map((m, i: number) => (
          <div style={{ display: "flex" }} key={m._id}></div>
        ))}
    </div>
  );
};

export default ScrollableChat;
