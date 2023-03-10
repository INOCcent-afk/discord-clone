import React from "react";

const Message = ({ id, username, message, time }) => {
	return (
		<div
			className={`w-fit max-w-[300px] ${id === 1 ? "ml-auto text-right" : ""}`}
		>
			{id !== 1 && <span className="text-sm text-gray-400">{username}</span>}
			<div
				className={` px-4 py-2 rounded-lg ${
					id === 1 ? "bg-blue-700" : "bg-green-600"
				}`}
			>
				{message}
			</div>
			<time className="text-xs text-gray-400 pr-1">{time}</time>
		</div>
	);
};

export default Message;
