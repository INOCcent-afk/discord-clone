import React from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const useSocket = () => {
	const { token } = useAuth();

	let socket;

	if (token) {
		socket = io.connect("http://localhost:8000", {
			query: {
				token,
			},
		});
	}
	return { socket };
};

export default useSocket;
