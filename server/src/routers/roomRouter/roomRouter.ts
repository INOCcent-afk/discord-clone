import express from "express";
import pool from "../../db";

const roomRouter = express.Router();

roomRouter.get("/", async (req, res) => {
	try {
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

		return res.status(201).send(rooms.rows);
	} catch (error) {
		res.status(400).send("FAILED TO LOGIN");
	}
});

export default roomRouter;
