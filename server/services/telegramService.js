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
  )} ${selectedCurrencyBuy}\`
👤 Имя: ${escapeMarkdown(tgUsername)}
📧 *Email*: \`${escapeMarkdown(email)}\`
`;

  if (wallet) {
    text += `📝 *Кошелек*: \`${escapeMarkdown(wallet)}\`\n`;
  } else if (fullName && cardNumber) {
    text += `👤 *Держатель карты*: ${escapeMarkdown(fullName)}\n`;
    text += `💳 *Номер карты*: \`${escapeMarkdown(cardNumber)}\`\n`;
  }

  console.log("Отправляем сообщение в Telegram:", text);

  const telegramUrl = `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
      }),
    });

    const result = await response.json();
    console.log("Ответ Telegram API:", result);

    if (!response.ok) {
      throw new Error(`Ошибка Telegram API: ${result.description}`);
    }

    return true;
  } catch (error) {
    console.error("Ошибка при отправке в Telegram:", error.message);
    throw error;
  }
};
