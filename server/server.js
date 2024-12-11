import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.post("/send-to-telegram", async (req, res) => {
  console.log("Используемые переменные окружения:");
  console.log("TELEGRAM_BOT_TOKEN:", process.env.TELEGRAM_BOT_TOKEN);
  console.log("TELEGRAM_CHAT_ID:", process.env.TELEGRAM_CHAT_ID);
  console.log("Заголовки запроса:", req.headers);
  console.log("Полученные данные на сервере:", req.body);

  const { email, tgUsername, wallet } = req.body;
  if (!tgUsername || !email || !wallet) {
    console.error("Ошибка: Одно из полей пустое", {
      tgUsername,
      email,
      wallet,
    });
    return res
      .status(400)
      .json({ error: "Все поля обязательны для заполнения" });
  }

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  const text = `
  👤 *Имя*: \\$\{tgUsername\}
  📧 *Email*: \\$\{email\}
  📝 *Кошелек*: \\$\{wallet\}
  `;

  const response = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "MarkdownV2",
    }),
  });

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!response.ok) {
      throw new Error("Не удалось отправить сообщение в Telegram");
    }

    res
      .status(200)
      .json({ success: true, message: "Сообщение успешно отправлено!" });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Ошибка при отправке сообщения в Telegram" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
