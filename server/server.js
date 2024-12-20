import express from "express";
import cors from "cors";
import path from "path";
import config from "./config/config.js";
import telegramRoutes from "./routes/telegramRoutes.js";
import coinRoutes from "./routes/currencyRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["https://sepawise.com", "http://localhost:3000"],
  })
);
app.use(express.json());

const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "public")));

// Настраиваем уникальные базовые пути для маршрутов
app.use("/telegram", telegramRoutes);
app.use("/currencies", coinRoutes);
app.use("/prices", priceRoutes);

app.listen(config.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${config.PORT}`);
});
