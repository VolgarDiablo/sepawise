import { sendTelegramMessage } from "../services/telegramService.js";

export const sendToTelegram = async (req, res) => {
  try {
    const { saleAmount, purchaseAmount, email, tgUsername, wallet } = req.body;
    console.log("Получены данные:", req.body);
    if (!saleAmount || !purchaseAmount || !tgUsername || !email || !wallet) {
      return res
        .status(400)
        .json({ error: "Все поля обязательны для заполнения" });
    }

    await sendTelegramMessage({
      saleAmount,
      purchaseAmount,
      email,
      tgUsername,
      wallet,
    });

    res
      .status(200)
      .json({ success: true, message: "Сообщение успешно отправлено!" });
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error.message);
    res.status(500).json({ error: "Ошибка при отправке сообщения" });
  }
};
