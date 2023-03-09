import { NextFunction, Request, Response } from "express";

import admin from "../config/firebase-config";

class Middleware {
	async decodeToken(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization.split(" ")[1];
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);

			if (decodeValue) {
				return next();
			}

			return res.json({ message: "Unauthorized" });
		} catch (error) {
			return res.json({ message: "Internal Error" });
		}
	}
}

module.exports = new Middleware();
