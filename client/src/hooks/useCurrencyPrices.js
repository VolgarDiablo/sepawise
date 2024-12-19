// client/src/hooks/useCurrencyPrices.js
import { useState, useEffect } from "react";
import { fetchCurrencyPrices } from "../utils/api";

const useCurrencyPrices = () => {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPrices = async () => {
      try {
        const data = await fetchCurrencyPrices(); // Запрос к серверу
        setPrices(data); // Сохраняем данные в состояние
      } catch (err) {
        setError(err.message); // Обрабатываем ошибку
      } finally {
        setLoading(false); // Сбрасываем состояние загрузки
      }
    };

    getPrices(); // Вызываем функцию получения данных
  }, []); // Выполняем только один раз при загрузке компонента

  return { prices, loading, error }; // Возвращаем состояние
};

export default useCurrencyPrices;
