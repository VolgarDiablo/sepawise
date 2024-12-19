import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

export const getAllPrices = async () => {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: "tether,bitcoin,monero",
        vs_currencies: "eur",
      },
    });

    if (!response.data) {
      throw new Error("Unexpected response from CoinGecko API");
    }

    const prices = {
      EURUSDT: response.data.tether.eur,
      BTCEUR: response.data.bitcoin.eur,
      XMREUR: response.data.monero.eur,
    };

    console.log(`[COINGECKO-REQUEST] Fetched prices:`, prices);
    return prices;
  } catch (error) {
    console.error(`[COINGECKO-ERROR] Error fetching prices:`, error.message);
    throw error;
  }
};
