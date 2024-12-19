import { getAllPrices } from "../services/coingeckoService.js";
import { setCache, getCache } from "../utils/cache.js";

const roundUp = (value, significantDigits) => {
  if (value === 0) return 0;
  const multiplier = Math.pow(
    10,
    significantDigits - Math.floor(Math.log10(Math.abs(value))) - 1
  );
  return Math.ceil(value * multiplier) / multiplier;
};

export const getCurrencyPrices = async (req, res) => {
  try {
    const symbols = ["EURUSDT", "EURBTC", "EURXMR"];
    const prices = {};
    const now = Date.now();

    const cacheMissed = [];
    for (const symbol of symbols) {
      const cachedPrice = getCache(symbol);
      if (cachedPrice) {
        try {
          const { price, timestamp } = JSON.parse(cachedPrice);
          if (now - timestamp < 15 * 60 * 1000) {
            console.log(`[CACHE-HIT] ${symbol}: ${price}`);
            prices[symbol] = price;
            continue;
          }
        } catch (err) {
          console.error(
            `[CACHE-ERROR] Invalid cache for ${symbol}:`,
            err.message
          );
        }
      }
      cacheMissed.push(symbol);
    }

    if (cacheMissed.length > 0) {
      console.log(`[CACHE-MISS] Fetching data for: ${cacheMissed.join(", ")}`);
      const fetchedPrices = await getAllPrices();

      if (fetchedPrices.EURUSDT) {
        const eurusdt = roundUp(parseFloat(fetchedPrices.EURUSDT), 2);
        const cachedValue = { price: eurusdt, timestamp: now };
        setCache("EURUSDT", JSON.stringify(cachedValue));
        prices["EURUSDT"] = eurusdt;
        console.log(`[CACHE-UPDATED] EURUSDT: ${eurusdt}`);
      }

      if (fetchedPrices.BTCEUR) {
        const eurbtc = roundUp(1 / parseFloat(fetchedPrices.BTCEUR), 2);
        const cachedValue = { price: eurbtc, timestamp: now };
        setCache("EURBTC", JSON.stringify(cachedValue));
        prices["EURBTC"] = eurbtc;
        console.log(`[CALCULATED] EURBTC: ${eurbtc}`);
      }

      if (fetchedPrices.XMREUR) {
        const eurxmr = roundUp(1 / parseFloat(fetchedPrices.XMREUR), 2);
        const cachedValue = { price: eurxmr, timestamp: now };
        setCache("EURXMR", JSON.stringify(cachedValue));
        prices["EURXMR"] = eurxmr;
        console.log(`[CALCULATED] EURXMR: ${eurxmr}`);
      }
    }

    // Возвращаем результат
    console.log(`[RESPONSE] Returning prices:`, prices);
    res.json(prices);
  } catch (error) {
    console.error(`[ERROR] Error fetching prices:`, error.message);
    res
      .status(500)
      .json({ message: "Error fetching prices", error: error.message });
  }
};
