import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const config = {
	clientUrl: process.env.CLIENT_URL,
};

export default config;
