import { createContext, useContext, useState } from "react";

export const ChatContext = createContext({});

interface ChatContextProviderProps {
    children: React.ReactNode;
}

const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState();

    return (
        <ChatContext.Provider
            value={{
                notification,
                setNotification,
                chats,
                setChats,
                selectedChat,
                setSelectedChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
export const useChat = () => useContext(ChatContext);
