import fetch from "node-fetch";
import config from "../config/config.js";
import escapeMarkdown from "../utils/escapeMarkdown.js";

export const sendTelegramMessage = async (data) => {
  const {
    saleAmount,
    purchaseAmount,
    tgUsername,
    email,
    wallet,
    fullName,
    cardNumber,
    selectedCurrencyBuy,
    selectedCurrencySell,
  } = data;

  let text = `
💰 *Сумма продажи*: \`${escapeMarkdown(saleAmount)} ${selectedCurrencySell}\`
💵 *Сумма получения*: \`${escapeMarkdown(
    purchaseAmount
  )} ${selectedCurrencyBuy} \`
👤 Имя: ${escapeMarkdown(tgUsername)}
📧 *Email*: \`${escapeMarkdown(email)}\`
`;

  if (wallet) {
    text += `📝 *Кошелек*: \`${escapeMarkdown(wallet)}\`\n`;
  } else if (fullName && cardNumber) {
    text += `👤 *Держатель карты*: ${escapeMarkdown(fullName)}\n`;
    text += `💳 *Номер карты*: \`${escapeMarkdown(cardNumber)}\`\n`;
  }

  const telegramUrl = `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: config.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "MarkdownV2",
    }),
  });

  if (!response.ok) {
    throw new Error("Не удалось отправить сообщение в Telegram");
  }

  return true;
};
