import "./App.css";
import {
	getAuth,
	signInWithRedirect,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [stateAuth, setStateAuth] = useState(
		false || window.localStorage.getItem("auth") === "true"
	);
	const [token, setToken] = useState("");

	const auth = getAuth();

	const loginWithGoogle = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		try {
			const { user } = await signInWithPopup(auth, provider);

			await axios.post("http://localhost:8000/api/v1/user/register", {
				uid: user.uid,
				email: user.email,
				username: user.displayName,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setStateAuth(true);
				window.localStorage.setItem("auth", "true");
				const token = await user.getIdToken();

				setToken(token);
			}
		});
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={loginWithGoogle}>Hello</button>
			</header>
		</div>
	);
}

export default App;
