import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import axios from "axios";
import UserContextProvider from "./context/UserContext";
import ChatContextProvider from "./context/ChatContext";
import { SocketProvider } from "./context/SocketContext";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <ChatContextProvider>
          <SocketProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </BrowserRouter>
          </SocketProvider>
        </ChatContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
