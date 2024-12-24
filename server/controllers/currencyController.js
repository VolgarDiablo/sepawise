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

export const getCurrencyPrices = async (req, res) => {
  try {
    const prices = {};
    const now = Date.now();

    // Check lastFetchTime in the cache
    if (cache.has("lastFetchTime")) {
      const lastFetchTime = JSON.parse(getCache("lastFetchTime"));
      if (now - lastFetchTime.timestamp < 5 * 60 * 1000) {
        console.log(
          `Data is still fresh. Last fetched at ${new Date(
            lastFetchTime.timestamp
          ).toLocaleString()}`
        );

        // Return cached data
        const cachedPrices = {};
        const allCachedKeys = cache.keys();
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
          timestamp: lastFetchTime.timestamp,
        });
        return;
      }
    }

    // Fetch new prices from the API
    const fetchedPrices = await getAllPrices();

    if (!fetchedPrices) {
      throw new Error("Fetched prices are undefined");
    }

    const calculateInversePair = (key, inverseKey) => {
      if (prices[key]?.price) {
        const rate = roundUp(1 / prices[key].price, 6);
        const inverseValue = {
          price: rate,
          timestamp: now,
          source: "calculated",
        };
        setCache(inverseKey, JSON.stringify(inverseValue));
        prices[inverseKey] = inverseValue;
      }
    };

    // Calculate additional pairs
    const calculatePair = (baseKey, targetKey, pairKey) => {
      if (prices[baseKey]?.price && prices[targetKey]?.price) {
        const rate = roundUp(
          prices[baseKey].price / prices[targetKey].price,
          6
        );
        const pairValue = {
          price: rate,
          timestamp: now,
          source: "calculated",
        };
        setCache(pairKey, JSON.stringify(pairValue));
        prices[pairKey] = pairValue;
      }
    };

    // Save fetched prices into the cache
    for (const [currency, data] of Object.entries(fetchedPrices)) {
      if (currency.toUpperCase() === "TETHER") {
        const tetherFixedUSD = { price: 1, timestamp: now, source: "fixed" };
        setCache("TETHERUSD", JSON.stringify(tetherFixedUSD));
        prices["TETHERUSD"] = tetherFixedUSD;

        if (data.eur) {
          const tetherEur = roundUp(data.eur, 6);
          const tetherFixedEUR = {
            price: tetherEur,
            timestamp: now,
            source: "adjusted",
          };
          setCache("TETHEREUR", JSON.stringify(tetherFixedEUR));
          prices["TETHEREUR"] = tetherFixedEUR;
        }
        continue;
      }

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

        // Calculate inverse pairs
        if (currency.toUpperCase() === "MONERO") {
          calculateInversePair(cacheKey, "USDMONERO");
        }
        if (currency.toUpperCase() === "BITCOIN") {
          calculateInversePair(cacheKey, "USDBITCOIN");
        }
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

    // Fixed pairs
    prices["USDUSD"] = { price: 1, timestamp: now, source: "fixed" };
    setCache("USDUSD", JSON.stringify(prices["USDUSD"]));

    if (prices["TETHEREUR"]?.price) {
      const eurToUsdRate = roundUp(1 / prices["TETHEREUR"].price, 6);
      prices["EURUSD"] = {
        price: eurToUsdRate,
        timestamp: now,
        source: "calculated",
      };
      setCache("EURUSD", JSON.stringify(prices["EURUSD"]));

      prices["USDEUR"] = { ...prices["TETHEREUR"] };
      setCache("USDEUR", JSON.stringify(prices["USDEUR"]));
    }

    // Cryptocurrency pairs
    const cryptoPairs = [
      ["BITCOINUSD", "MONEROUSD", "BITCOINMONERO"], // Курс Bitcoin к Monero
      ["MONEROUSD", "BITCOINUSD", "MONEROBITCOIN"], // Курс Monero к Bitcoin
      ["BITCOINUSD", "USDTETHER", "USDBITCOIN"], // Курс USD к Bitcoin
      ["MONEROUSD", "USDTETHER", "USDMONERO"], // Курс USD к Monero
      ["BITCOINEUR", "EURTETHER", "EURBITCOIN"], // Курс EUR к Bitcoin
      ["MONEROEUR", "EURTETHER", "EURMONERO"], // Курс EUR к Monero
      ["USDEUR", "MONEROEUR", "EURMONERO"], // Прямой расчет EUR к Monero
      ["USDEUR", "BITCOINEUR", "EURBITCOIN"], // Прямой расчет EUR к Bitcoin
    ];

    cryptoPairs.forEach(([base, target, pair]) => {
      calculatePair(base, target, pair);
    });

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
