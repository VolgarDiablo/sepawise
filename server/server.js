import express from "express";
import cors from "cors";
import path from "path";
import config from "./config/config.js";
import telegramRoutes from "./routes/telegramRoutes.js";
import coinRoutes from "./routes/coinRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);
app.use(express.json());

const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", telegramRoutes);
app.use("/api", coinRoutes);

// Запуск сервера
app.listen(config.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${config.PORT}`);
});
