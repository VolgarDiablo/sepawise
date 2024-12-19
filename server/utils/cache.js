import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 0 });

export const setCache = (key, value) => {
  try {
    cache.set(key, value);
    console.log(`[CACHE-SET] ${key}: ${value}`);
  } catch (err) {
    console.error(`[CACHE-ERROR] Error setting cache for ${key}:`, err.message);
  }
};

export const getCache = (key) => {
  try {
    const value = cache.get(key);
    if (value) {
      console.log(`[CACHE-HIT] ${key}: ${value}`);
    } else {
      console.log(`[CACHE-MISS] ${key}`);
    }
    return value;
  } catch (err) {
    console.error(`[CACHE-ERROR] Error getting cache for ${key}:`, err.message);
    return null;
  }
};
