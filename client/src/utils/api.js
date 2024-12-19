export const fetchCurrencyPrices = async () => {
  try {
    const response = await fetch("/api/currency-prices"); // Запрос к серверу
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json(); // Распарсить JSON
    return data; // Вернуть данные
  } catch (error) {
    console.error("Error fetsching currency prices:", error.message);
    throw error; // Прокидываем ошибку
  }
};
