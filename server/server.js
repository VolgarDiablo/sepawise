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

const escapeMarkdown = (text) => {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
};

app.post("/send-to-telegram", async (req, res) => {
  console.log("Полученные данные на сервере:", req.body);

  const { saleAmount, purchaseAmount, email, tgUsername, wallet } = req.body;
  if (!saleAmount || !purchaseAmount || !tgUsername || !email || !wallet) {
    console.error("Ошибка: Одно из полей пустое", {
      saleAmount,
      purchaseAmount,
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
💰 *Сумма продажи*: \`${escapeMarkdown(saleAmount)} EUR\`
💵 *Сумма получения*: \`${escapeMarkdown(purchaseAmount)} USDT TRC20\`
👤 Имя: ${escapeMarkdown(tgUsername)}
📧 *Email*: \`${escapeMarkdown(email)}\`
📝 *Кошелек*: \`${escapeMarkdown(wallet)}\`
  `;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
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
