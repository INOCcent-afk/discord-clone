import express from "express";
import pool from "../../db";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
	const { uid, email, username } = req.body;

	try {
		const user = await pool.query(
			`SELECT * FROM "discordUser" WHERE uid = $1`,
			[uid]
		);

		if (user.rows.length) {
			return res.status(200).send(user.rows[0]);
		}

		const createdUser = await pool.query(
			`INSERT INTO "discordUser" (uid, email, username) VALUES ($1, $2, $3) RETURNING id`,
			[uid, email, username]
		);

		return res.status(201).send(createdUser.rows[0]);
	} catch (error) {
		res.status(400).send("FAILED TO LOGIN");
	}
});

export default userRouter;
