import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

export const currencies = [
  {
    id: 1,
    name: "Tether",
    network: "USDT (TRC20)",
    icon: `${BASE_URL}/public/images/crypto/tetherTrc20.webp`,
    reserve: "4 638 936",
    minAmount: "500",
    maxAmount: "150 000",
  },
  {
    id: 2,
    name: "Bitcoin",
    network: "BTC",
    icon: `${BASE_URL}/public/images/crypto/bitcoin.png`,
    reserve: "141",
    minAmount: "500",
    maxAmount: "150 000",
  },
  {
    id: 3,
    name: "Monero",
    network: "XMR",
    icon: `${BASE_URL}/public/images/crypto/monero.png`,
    reserve: "9 656",
    minAmount: "500",
    maxAmount: "150 000",
  },
];
