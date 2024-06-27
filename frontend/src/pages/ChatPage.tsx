import { useUser } from '../context/UserContext'
import SideDrawer from '../components/chatUtils/SideDrawer'
import { Box } from '@mui/material'
import MyChats from '../components/chatUtils/MyChats'
import ChatBox from '../components/chatUtils/ChatBox'

const ChatPage = () => {
  const {user,loading}:any = useUser()
  if(loading) return (<div>Loading...</div>)
  if(!user) window.location.href = '/'
  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    {user && <SideDrawer />}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flex: 1, padding: '10px' }}> 
      {user && <MyChats />}
      {user && <ChatBox />}
    </Box>
  </Box>
  )
}

export default ChatPage