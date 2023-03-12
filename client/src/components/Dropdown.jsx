import React, { useState } from "react";

const Dropdown = ({ joinRoom, roomName, members }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="w-full flex flex-col">
			<div className="hover:bg-gray-700 p-2 w-full flex items-center justify-between">
				<button onClick={joinRoom} className="w-full text-left">
					{roomName}
				</button>
				{Boolean(members.length) && (
					<button
						className="flex items-center items center justify-center rounded-full w-6 h-6 border"
						onClick={() => setIsOpen(!isOpen)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							fill="currentColor"
							className="bi bi-chevron-down"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
							/>
						</svg>
					</button>
				)}
			</div>
			{isOpen && members && (
				<div className="flex flex-col pl-6 mt-2 gap-2">
					{members.map((member) => (
						<p key={member.id} className="text-sm">
							{member.username}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
