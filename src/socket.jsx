import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
const server = import.meta.env.VITE_SOCKET_URL;
const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(server, {
        withCredentials: true,
        auth: {
            token: localStorage.getItem("adminAccessToken")
        },
        transports: ['websocket', 'polling']

    }), []);

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};

export { SocketProvider, getSocket };
