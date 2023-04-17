
import React, { createContext, useEffect, useState, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext({
  socket: {} as Socket,
});

const SocketProvider = ({ children }: { children: any }) => {
  const [socket, setSocket] = useState<any>(null);
  
 console.log("socket",socket)
  useEffect(() => {
    const connectSocket = async () => {
      try {
        // const token = await AsyncStorage.getItem('@access-token');
        const newSocket = io('http://localhost:3000', {
          transports: ['websocket'],
          withCredentials: true,
        });
        setSocket(newSocket);
      } catch (error) {
        console.log(error);
      }
    };
    connectSocket();
  }, []);
  

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};



const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
