import { sendTelegramMessage } from "../services/telegramService.js";

export const sendToTelegram = async (req, res) => {
  try {
    const {
      saleAmount,
      purchaseAmount,
      email,
      tgUsername,
      wallet,
      fullName,
      cardNumber,
      selectedCurrencyBuy,
      selectedCurrencySell,
    } = req.body;

    console.log("Получены данные:", req.body);

    // Проверяем, что обязательные поля заполнены
    if (!saleAmount || !purchaseAmount || !email || !tgUsername) {
      return res
        .status(400)
        .json({ error: "Все поля обязательны для заполнения" });
    }

    // Проверяем, что либо wallet, либо fullName и cardNumber заполнены
    if (!wallet && (!fullName || !cardNumber)) {
      return res.status(400).json({
        error:
          "Необходимо указать либо кошелек (wallet), либо имя и номер карты (fullName и cardNumber)",
      });
    }

    // Формируем данные для отправки
    const messageData = {
      saleAmount,
      purchaseAmount,
      email,
      tgUsername,
      selectedCurrencyBuy,
      selectedCurrencySell,
    };

    if (wallet) {
      messageData.wallet = wallet;
    } else {
      messageData.fullName = fullName;
      messageData.cardNumber = cardNumber;
    }

    // Отправляем сообщение в Telegram
    await sendTelegramMessage(messageData);

    res
      .status(200)
      .json({ success: true, message: "Сообщение успешно отправлено!" });
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error.message);
    res.status(500).json({ error: "Ошибка при отправке сообщения" });
  }
};
