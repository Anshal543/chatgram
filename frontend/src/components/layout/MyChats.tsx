import React from 'react'
import { useChat } from '../../context/ChatContext';
import { useUser } from '../../context/UserContext';


const MyChats = () => {
  const { selectedChat, setSelectedChat, chats, setChats }: any = useChat();
  const {user} = useUser();

  return (
    <div>MyChats</div>
  )
}

export default MyChats