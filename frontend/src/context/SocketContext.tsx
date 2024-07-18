import React, { createContext, useState } from "react";
interface SocketContextProps {
  children: React.ReactNode;
}
const SocketContext = createContext({});

export const SocketProvider = ({ children }: SocketContextProps) => {
  let [socket, setSocket] = useState(null);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
