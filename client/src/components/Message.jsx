import React from "react";
import { useAuth } from "../context/AuthContext";

const Message = ({ id, username, message, time }) => {
	const { user } = useAuth();

	return (
		<div
			className={`w-fit max-w-[300px] ${
				id === user.id ? "ml-auto text-right" : ""
			}`}
		>
			{id !== user.id && (
				<span className="text-sm text-gray-400">{username}</span>
			)}
			<div
				className={` px-4 py-2 rounded-lg text-left ${
					id === user.id ? "bg-blue-700" : "bg-green-600"
				}`}
			>
				{message}
			</div>
			<time className="text-xs text-gray-400 pr-1">{time}</time>
		</div>
	);
};

export default Message;
