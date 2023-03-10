import "./App.css";
import AppTemplate from "./containers/AppTemplate";
import { AuthProvider } from "./context/AuthContext";

function App() {
	return (
		<AuthProvider>
			<AppTemplate />
		</AuthProvider>
	);
}

export default App;
