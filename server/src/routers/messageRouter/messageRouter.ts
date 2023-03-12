import express from "express";
import pool from "../../db";

const messageRouter = express.Router();

messageRouter.get("/:roomId", async (req, res) => {
	const { roomId } = req.params;

	try {
		const rooms = await pool.query(
			`	
            SELECT * FROM message WHERE roomId = $1
            `,
			[roomId]
		);

		return res.status(200).send(rooms.rows);
	} catch (error) {
		res.status(400).send("FAILED TO LOGIN");
	}
});

export default messageRouter;
