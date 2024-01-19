// import { useState, createContext } from "react";
// import { io, Socket } from "socket.io-client";

// const socketConn: Socket = io("http://localhost:8000", { withCredentials: true, autoConnect: false, auth: });

// const Context = createContext({ socket: socketConn });
// function ContextProvider(props: any) {
//     const [socket, _] = useState(socketConn);

//     return (
//         <Context.Provider value={{ socket }}>
//             {props.children}
//         </Context.Provider>
//     );
// }

// export { ContextProvider, Context };

import { useState, createContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Create a new context for the socket and user information
const SocketContext = createContext<{ socket: Socket | null; user?: any }>({
    socket: null,
    user: null,
});

// Create a component that will provide the context
function SocketContextProvider(props: any) {
    const { user, children } = props;

    const socketConn: Socket = io("http://localhost:8000", {
        withCredentials: true,
        autoConnect: false,
    });

    // State to store the socket and user information
    const [socket, setSocket] = useState<Socket | null>(socketConn);
    // useEffect(() => {
    //     setSocket()
    // }, [user])
    console.log(setSocket);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export { SocketContextProvider, SocketContext };

