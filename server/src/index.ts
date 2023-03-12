import bodyParser from "body-parser";
import express from "express";
import http from "http";
import cors from "cors";
import config from "./utils/config";
import userRouter from "./routers/userRouter/userRouter";
import { Server } from "socket.io";
import admin from "./config/firebase-config";
import pool from "./db";
import roomRouter from "./routers/roomRouter/roomRouter";
import messageRouter from "./routers/messageRouter/messageRouter";

const app = express();
const router = express.Router();

const server = http.createServer(app);

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
	cors({
		origin: config.clientUrl,
		methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
		credentials: true,
	})
);
app.use(function (req, res, next) {
	res.header("Content-Type", "application/json;charset=UTF-8");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// Routers
router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/message", messageRouter);
app.use("/api/v1", router); // Default starting url

// Socket.io
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", async (socket) => {
	const token = socket.handshake.query.token as string; // jwt token passed from client

	// authenticate
	try {
		if (!token) throw new Error("Token not found");
		await admin.auth().verifyIdToken(token);
	} catch (err) {
		// jwt verification failed
		socket.emit("authFailed"); // emits event to client to let client know authentication failed, optional.
		socket.disconnect(); // disconnect client
	}

	socket.on("join_room", async (data) => {
		const { roomName, roomId, userId } = data;

		try {
			const room = await pool.query(
				`SELECT * FROM "discordUserRooms" WHERE userid = $1 AND roomId = $2`,
				[userId, roomId]
			);

			console.log(room);

			if (room.rows.length) return;

			await pool.query(
				`INSERT INTO "discordUserRooms" (userId, roomId) VALUES ($1, $2) returning *`,
				[userId, roomId]
			);

			const rooms = await pool.query(
				`
				SELECT room.id, room.name, roomAdminId,
				json_agg(json_build_object('id', "discordUser".id,'username', username)) AS members
				FROM room
				LEFT JOIN "discordUserRooms"
				ON "discordUserRooms".roomId = room.id
				LEFT JOIN "discordUser"
				ON "discordUser".id = "discordUserRooms".userId
				GROUP BY room.id;
				`
			);

			io.emit("update_rooms", rooms.rows);
			console.log(rooms.rows);
		} catch (error) {
			console.log(error);
			throw new Error("Failed to join the room");
		}
	});

	socket.on("create_room", async (data) => {
		const { roomAdminId, name } = data;

		try {
			const room = await pool.query(
				`
				INSERT INTO room (roomAdminId, name) VALUES ($1, $2) returning id
				`,
				[roomAdminId, name]
			);

			await pool.query(
				`INSERT INTO "discordUserRooms" (userId, roomId) VALUES ($1, $2) returning *`,
				[roomAdminId, room.rows[0].id]
			);

			const rooms = await pool.query(
				`	
				SELECT room.id, room.name, roomAdminId, 
				json_agg(json_build_object('id', "discordUser".id,'username', username)) AS members 
				FROM room 
				LEFT JOIN "discordUserRooms" 
				ON "discordUserRooms".roomId = room.id
				LEFT JOIN "discordUser"
				ON "discordUser".id = "discordUserRooms".userId
				GROUP BY room.id;
				`
			);

			io.emit("update_rooms", rooms.rows);
		} catch (error) {
			console.log(error);
			throw new Error("Failed to create room");
		}
	});

	socket.on("send_message", async (data) => {
		const { message, userId, roomId } = data;

		try {
			await pool.query(
				`
				INSERT INTO message (message, userId, roomId) VALUES ($1,$2,$3) returning *
				`,
				[message, userId, roomId]
			);

			const messages = await pool.query(
				`
				SELECT * FROM message WHERE roomId = $1
				`,
				[roomId]
			);

			io.emit("update_messages", messages.rows);
			console.log(messages);
		} catch (error) {
			console.log(error);
			throw new Error("Failed to send message");
		}
	});

	socket.on("disconnect", () => {
		console.log("User disconnected", socket.id);
	});
});

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => {
	console.log(`SERVER IS RUNNING AT ${PORT}`);
});
