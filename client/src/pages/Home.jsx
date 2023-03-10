import React from "react";
import Dropdown from "../components/Dropdown";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../components/Message";

const Home = () => {
	return (
		<div className="flex bg-gray-900 h-screen w-full">
			<div className="flex flex-col justify-between h-full border-r w-full max-w-[300px] border-r-gray-600 p-4">
				<div className="flex flex-col gap-4">
					<button className="bg-blue-900 py-2 px-4 rounded-lg hover:bg-blue-800">
						Create Room
					</button>
					<Dropdown />
					<Dropdown />
				</div>
				<div className="flex flex-col items-center gap-3">
					<h3>Dave Inoc</h3>
					<button className="bg-red-800 flex items-center justify-center px-4 py-2 rounded-lg w-full">
						Sign out
					</button>
				</div>
			</div>
			<div className="flex flex-col p-2 h-full w-full justify-between gap-2">
				<ScrollToBottom className="h-full max-h-full overflow-auto border border-gray-600 rounded-md p-4">
					<div className="flex flex-col gap-4 self-end w-full h-full ">
						<Message
							id={1}
							username="Dave inoc"
							message="Hey Guys!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="asd asda dasdqlwlwe asakjda asdjas dnasd adand,mlknzxcklnzcnlk ansdadnadknqwnda sa,md snd aa"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>
						<Message
							id={1}
							username="Dave inoc"
							message="Hey Guys!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="asd asda dasdqlwlwe asakjda asdjas dnasd adand,mlknzxcklnzcnlk ansdadnadknqwnda sa,md snd aa"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>

						<Message
							id={1}
							username="Dave inoc"
							message="Hey Guys!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="asd asda dasdqlwlwe asakjda asdjas dnasd adand,mlknzxcklnzcnlk ansdadnadknqwnda sa,md snd aa"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>
						<Message
							id={2}
							username="Mackie"
							message="Wassup boi!"
							time="06:31"
						/>
					</div>
				</ScrollToBottom>
				<div className="relative">
					<textarea
						name=""
						className="h-full w-full bg-gray-900 border border-gray-600 rounded-sm min-h-[100px] p-2 pr-20   z-[1]"
					></textarea>
					<button className="absolute z-10 right-4 bottom-2 bg-gray-600 p-4 rounded-full">
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
		</div>
	);
};

export default Home;
