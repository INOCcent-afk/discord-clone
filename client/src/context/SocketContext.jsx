import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

export const SocketContext = createContext({
	socket: undefined,
});

const SocketProvider = ({ children }) => {
	const { token } = useAuth();

	const [socket, setSocket] = useState(null);

	useEffect(() => {
		if (!token) return;

		setSocket(
			io.connect("http://localhost:8000", {
				query: {
					token,
				},
			})
		);
	}, [token]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
