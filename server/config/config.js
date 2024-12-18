import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};
