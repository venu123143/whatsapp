import { useState, createContext } from "react";
import io from "socket.io-client";

const socketConn = io("http://localhost:8000");

const Context = createContext({ socket: socketConn });

function ContextProvider(props: any) {
    const [socket, setSocket] = useState(socketConn);
    console.log(setSocket);

    return (
        <Context.Provider value={{ socket }}>
            {props.children}
        </Context.Provider>
    );
}

export { ContextProvider, Context };
