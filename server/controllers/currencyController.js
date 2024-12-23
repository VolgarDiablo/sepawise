import { getAllPrices } from "../services/coingeckoService.js";
import cache, { getCache, setCache } from "../utils/cache.js";

const roundUp = (value, significantDigits) => {
  if (value === 0) return 0;
  const multiplier = Math.pow(
    10,
    significantDigits - Math.floor(Math.log10(Math.abs(value))) - 1
  );
  return Math.ceil(value * multiplier) / multiplier;
};

const calculateExchangeRate = (baseCurrency, targetCurrency, prices) => {
  const baseToUSD = prices[`${baseCurrency.toUpperCase()}USD`]?.price;
  const targetToUSD = prices[`${targetCurrency.toUpperCase()}USD`]?.price;

  if (!baseToUSD || !targetToUSD) {
    console.warn(
      `Missing price data for ${baseCurrency} or ${targetCurrency} relative to USD.`
    );
    return null;
  }

  return roundUp(baseToUSD / targetToUSD, 6);
};

export const getCurrencyPrices = async (req, res) => {
  try {
    const prices = {};
    const now = Date.now();

    // Check lastFetchTime in the cache
    const lastFetchTime = getCache("lastFetchTime");
    if (lastFetchTime) {
      const lastTimestamp = JSON.parse(lastFetchTime).timestamp;
      if (now - lastTimestamp < 5 * 60 * 1000) {
        console.log(
          `Data is still fresh. Last fetched at ${new Date(
            lastTimestamp
          ).toLocaleString()}`
        );

        // Return cached data
        const cachedPrices = {};
        const allCachedKeys = cache.keys(); // Get all cached keys
        for (const key of allCachedKeys) {
          if (key !== "lastFetchTime") {
            const value = getCache(key);
            if (value) {
              cachedPrices[key] = JSON.parse(value);
            }
          }
        }

        res.json({
          prices: cachedPrices,
          timestamp: lastTimestamp,
        });
        return; // Exit if data is fresh
      }
    }

    // Fetch new prices from the API
    const fetchedPrices = await getAllPrices();

    if (!fetchedPrices) {
      throw new Error("Fetched prices are undefined");
    }

    // Save fetched prices into the cache
    for (const [currency, data] of Object.entries(fetchedPrices)) {
      if (currency.toLowerCase() === "tether") continue; // Skip Tether

      if (data.usd) {
        const usdPrice = roundUp(data.usd, 6);
        const cacheKey = `${currency.toUpperCase()}USD`;
        const cachedValue = {
          price: usdPrice,
          timestamp: now,
          source: "coingecko",
        };
        setCache(cacheKey, JSON.stringify(cachedValue));
        prices[cacheKey] = cachedValue;
      }
      if (data.eur) {
        const eurPrice = roundUp(data.eur, 6);
        const cacheKey = `${currency.toUpperCase()}EUR`;
        const cachedValue = {
          price: eurPrice,
          timestamp: now,
          source: "coingecko",
        };
        setCache(cacheKey, JSON.stringify(cachedValue));
        prices[cacheKey] = cachedValue;
      }
    }

    // Set fixed value for TETHERUSD
    if (!prices["TETHERUSD"]) {
      const tetherFixed = { price: 1, timestamp: now, source: "fixed" };
      setCache("TETHERUSD", JSON.stringify(tetherFixed));
      prices["TETHERUSD"] = tetherFixed;
    }

    // Calculate missing pairs
    const currencyPairs = [
      ["bitcoin", "monero"],
      ["monero", "bitcoin"],
    ];

    for (const [base, target] of currencyPairs) {
      const pairKey = `${base.toUpperCase()}${target.toUpperCase()}`;
      const reversePairKey = `${target.toUpperCase()}${base.toUpperCase()}`;

      if (!prices[pairKey]) {
        const rate = calculateExchangeRate(base, target, prices);
        if (rate !== null) {
          prices[pairKey] = {
            price: rate,
            timestamp: now,
            source: "calculated",
          };
          setCache(pairKey, JSON.stringify(prices[pairKey]));
        }
      }

      if (!prices[reversePairKey]) {
        const reverseRate = calculateExchangeRate(target, base, prices);
        if (reverseRate !== null) {
          prices[reversePairKey] = {
            price: reverseRate,
            timestamp: now,
            source: "calculated",
          };
          setCache(reversePairKey, JSON.stringify(prices[reversePairKey]));
        }
      }
    }

    // Save lastFetchTime in the cache
    setCache("lastFetchTime", JSON.stringify({ timestamp: now }));

    res.json({ prices, timestamp: now });
  } catch (error) {
    console.error(`[ERROR] Error fetching prices:`, error.message);
    res
      .status(500)
      .json({ message: "Error fetching prices", error: error.message });
  }
};
