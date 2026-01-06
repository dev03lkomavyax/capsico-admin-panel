// import { createContext, useMemo, useContext } from "react";
// import io from "socket.io-client";
// const server = import.meta.env.VITE_SOCKET_URL;
// const SocketContext = createContext();

// const getSocket = () => useContext(SocketContext);

// const SocketProvider = ({ children }) => {
//     const socket = useMemo(() => io(server, {
//         withCredentials: true,
//         auth: {
//             token: localStorage.getItem("adminAccessToken")
//         },
//         transports: ['websocket', 'polling']

//     }), []);

//     return (
//         <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//     );
// };

// export { SocketProvider, getSocket };

// import { createContext, useContext, useEffect, useMemo } from "react";
// import io from "socket.io-client";

// const server = import.meta.env.VITE_SOCKET_URL;
// const SocketContext = createContext();

// const getSocket = () => useContext(SocketContext);

// const SocketProvider = ({ children }) => {
//   const token = localStorage.getItem("adminAccessToken");
// //   const userInfo = readCookie("userInfo");
//   // console.log("userInfo",userInfo);

//   const socket = useMemo(
//     () =>
//       io(server, {
//         withCredentials: true,
//         auth: { token },
//         transports: ["websocket", "polling"],
//       }),
//     [token]
//   );

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("✅ Connected to socket:", socket);
//       socket.emit("join", { userId: "" });
//     });

//     socket.on("connect_error", (err) => {
//       console.error("❌ Socket connection error:", err.message);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

// export { getSocket, SocketProvider };

import { createContext, useContext, useEffect, useMemo } from "react";
import io from "socket.io-client";
import useGetApiReq from "./hooks/useGetApiReq";
import useCrashReporter from "./hooks/useCrashReporter";

const server = import.meta.env.VITE_SOCKET_URL;
const SocketContext = createContext();

export const getSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const token = localStorage.getItem("adminAccessToken");
  const { reportCrash } = useCrashReporter();

  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
        auth: { token },
        transports: ["websocket", "polling"],
        autoConnect: true,
      }),
    [] // ✅ keep this stable across renders
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
      socket.emit("join", { userId: "" });
    });

    socket.on("error", (err) => {
      console.error("❌ Socket connection error:", err.message);
      reportCrash({
        error: err,
        screenName: "SOCKET_CONNECTION_ERROR",
        severity: "CRITICAL",
        request: {
          body: {
            socketId: socket.id,
          },
        },
        userType: "Admin",
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
      if (reason === "io server disconnect") {
        // Server disconnected, try reconnecting with new token
        socket.connect();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // ✅ react to token changes manually
  useEffect(() => {
    if (token) {
      socket.auth = { token };
      if (!socket.connected) socket.connect();
    }
  }, [token, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
