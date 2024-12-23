import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

export const getAllPrices = async () => {
  try {
    // Указываем нужные валюты
    const ids = "bitcoin,monero,tether";
    const vsCurrencies = "usd,eur";

    const response = await axios.get(COINGECKO_API_URL, {
      headers: {
        accept: "application/json",
      },
      params: {
        ids, // Названия валют
        vs_currencies: vsCurrencies, // Валюты для сравнения
      },
    });

    if (!response.data) {
      throw new Error("Unexpected response from CoinGecko API");
    }

    return response.data;
  } catch (error) {
    console.error(`[COINGECKO-ERROR] Error fetching prices:`, error.message);
    throw error;
  }
};
