import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../components/Message";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
// import useSocket from "../hooks/useSocket";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";

const Home = () => {
	const [rooms, setRooms] = useState([]);
	const [createRoomName, setCreateRoomName] = useState("");
	const [modal, setModal] = useState(false);
	const [message, setMessage] = useState("");
	const [isLobby, setIsLobby] = useState(false);
	const [messages, setMessages] = useState([]);
	const navigate = useNavigate();
	const { setSignedIn, user } = useAuth();
	// firebase auth
	const auth = getAuth();
	// const { socket } = useSocket();
	const params = useParams();
	const { socket } = useContext(SocketContext);

	const getRoom = async () => {
		const data = await axios.get("http://localhost:8000/api/v1/room/");

		setRooms(data.data);
	};

	const getMessages = async () => {
		const data = await axios.get(
			`http://localhost:8000/api/v1/message/${params.id}`
		);

		setMessages(data.data);
	};

	const signOutClick = async () => {
		signOut(auth)
			.then(() => {
				window.localStorage.removeItem("auth");
				setSignedIn(false);

				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const joinRoom = async ({ roomId, roomName }) => {
		try {
			await socket.emit("join_room", {
				roomId,
				roomName,
				userId: user.id,
			});

			navigate(`/${roomId}`);
		} catch (error) {
			console.log(error);
		}
	};

	const createRoom = async ({ roomName }) => {
		try {
			await socket.emit("create_room", {
				roomAdminId: user.id,
				name: roomName,
			});

			setModal(false);
		} catch (error) {
			console.log(error);
		}
	};

	const sendMessage = async () => {
		try {
			await socket.emit("send_message", {
				message: message,
				userId: user.id,
				roomId: params.id,
			});

			setMessages((data) => [
				...data,
				{
					createdat: "13123123",
					id: Math.random(),
					message: message,
					roomid: params.id,
					userid: user.id,
				},
			]);

			setMessage("");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRoom();
	}, []);

	useEffect(() => {
		if (!socket) return;

		const updateRooms = (data) => {
			setRooms(data);
			console.log(data);
		};

		const updateMessages = (data) => {
			setMessages(data);
			console.log(data);
		};

		socket.on("update_rooms", updateRooms);

		socket.on("update_messages", updateMessages);

		return () => {
			socket.off("update_rooms", updateRooms);
			socket.off("update_messages", updateMessages);
		};
	}, [socket]);

	useEffect(() => {
		if (params && params.id) {
			getMessages();
			return setIsLobby(true);
		}

		setIsLobby(false);
	}, [params]);

	return (
		<div className="flex bg-gray-900 h-screen w-full">
			{modal && (
				<>
					<div
						onClick={() => setModal(false)}
						className="fixed bg-black opacity-50 h-screen w-screen z-40 top-0 left-0"
					></div>
					<div className="fixed z-50 flex flex-col gap-8 bg-black p-8 border rounded-lg top-1/2 left-1/2 items-center translate-x-[-50%] translate-y-[-50%] text-black">
						<input
							type="text"
							onChange={(e) => setCreateRoomName(e.currentTarget.value)}
							value={createRoomName}
							placeholder="Create Room"
							className="px-2 py-4"
						/>
						<button
							onClick={() => createRoom({ roomName: createRoomName })}
							className="bg-green-700 w-fit py-2 px-4 cursor-pointer rounded-md text-white font-bold"
						>
							CREATE ROOM!
						</button>
					</div>
				</>
			)}

			<div className="flex flex-col justify-between h-full border-r w-full max-w-[300px] border-r-gray-600 p-4">
				<div className="flex flex-col gap-4 max-h-full overflow-auto">
					<button
						onClick={() => setModal(true)}
						className="bg-blue-900 py-2 px-4 rounded-lg hover:bg-blue-800"
					>
						Create Room
					</button>
					{rooms.map(({ name, id, members }) => {
						const cool = members[0].id === null ? [] : members;

						return (
							<Dropdown
								key={id}
								joinRoom={() => joinRoom({ roomName: name, roomId: id })}
								roomName={name}
								members={cool}
							/>
						);
					})}
				</div>
				<div className="flex flex-col items-center gap-3">
					{user && <h3>{user.username}</h3>}
					<button
						onClick={signOutClick}
						className="bg-red-800 flex items-center justify-center px-4 py-2 rounded-lg w-full"
					>
						Sign out
					</button>
				</div>
			</div>
			{isLobby ? (
				<div className="flex flex-col p-2 h-full w-full justify-between gap-2">
					<ScrollToBottom className="h-full max-h-full overflow-auto border border-gray-600 rounded-md py-4">
						<div className="flex flex-col gap-4 self-end w-full h-full px-4">
							{messages.map((message) => (
								<Message
									key={message.id}
									id={message.userid}
									username={message.userid}
									message={message.message}
									time={message.createdat}
								/>
							))}
						</div>
					</ScrollToBottom>
					<div className="relative">
						<textarea
							name=""
							value={message}
							onChange={(e) => setMessage(e.currentTarget.value)}
							className="h-full w-full bg-gray-900 border border-gray-600 rounded-sm min-h-[100px] p-2 pr-20   z-[1]"
						></textarea>
						<button
							onClick={sendMessage}
							className="absolute z-10 right-4 bottom-2 bg-gray-600 p-4 rounded-full"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-send"
								viewBox="0 0 16 16"
							>
								<path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
							</svg>
						</button>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center w-full">
					<h1 className="font-bold text-4xl">{"<-"} Please select a room</h1>
				</div>
			)}
		</div>
	);
};

export default Home;
