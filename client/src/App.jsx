import "./App.css";
import AppTemplate from "./containers/AppTemplate";
import { AuthProvider } from "./context/AuthContext";
import SocketProvider from "./context/SocketContext";

function App() {
	return (
		<AuthProvider>
			<SocketProvider>
				<AppTemplate />
			</SocketProvider>
		</AuthProvider>
	);
}

export default App;
