import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
	user: null,
	setUser: null,
	isSignedIn: false || window.localStorage.getItem("auth") === "true",
	setSignedIn: null,
	token: "",
	setToken: null,
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isSignedIn, setSignedIn] = useState(
		false || window.localStorage.getItem("auth") === "true"
	);
	const [token, setToken] = useState("");

	return (
		<AuthContext.Provider
			value={{ user, setUser, isSignedIn, setSignedIn, token, setToken }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const auth = useContext(AuthContext);

	return { ...auth };
};
