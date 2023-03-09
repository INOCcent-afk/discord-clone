import bodyParser from "body-parser";
import express from "express";
import http from "http";
import cors from "cors";
import config from "./utils/config";

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
// router.use("/user", userRouter);
// router.use("/tweet", tweetRouter);
app.use("/api/v1", router); // Default starting url

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => {
	console.log(`SERVER IS RUNNING AT ${PORT}`);
});
