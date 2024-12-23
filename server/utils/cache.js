import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 5 * 60 }); // Кеш с временем жизни 5 минут

export const setCache = (key, value) => {
  try {
    cache.set(key, value); // Сохраняем значение по ключу
    console.log(`[CACHE-SET] ${key}: ${JSON.stringify(value)}`);
  } catch (err) {
    console.error(`[CACHE-ERROR] Error setting cache for ${key}:`, err.message);
  }
};

export const getCache = (key) => {
  try {
    const value = cache.get(key); // Получаем значение из кэша
    if (value) {
      console.log(`[CACHE-HIT] ${key}: ${JSON.stringify(value)}`);
    } else {
      console.log(`[CACHE-MISS] ${key}`);
    }
    return value;
  } catch (err) {
    console.error(`[CACHE-ERROR] Error getting cache for ${key}:`, err.message);
    return null;
  }
};

export const clearCache = () => {
  try {
    cache.flushAll(); // Очищаем весь кэш
    console.log(`[CACHE-CLEAR] All cache cleared`);
  } catch (err) {
    console.error(`[CACHE-ERROR] Error clearing cache:`, err.message);
  }
};

// Экспорт самого экземпляра кэша
export default cache;
