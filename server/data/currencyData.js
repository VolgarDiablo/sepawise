import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

export const currencies = [
  {
    id: 1,
    type: "crypto",
    name: "Tether",
    network: "USDT (TRC20)",
    icon: `${BASE_URL}/public/images/crypto/tetherTrc20.svg`,
    reserve: "4 638 936",
    minAmount: "500",
    maxAmount: "150 000",
  },
  {
    id: 2,
    type: "crypto",
    name: "Bitcoin",
    network: "BTC",
    icon: `${BASE_URL}/public/images/crypto/bitcoin.svg`,
    reserve: "141",
    minAmount: "500",
    maxAmount: "150 000",
  },
  {
    id: 3,
    type: "crypto",
    name: "Monero",
    network: "XMR",
    icon: `${BASE_URL}/public/images/crypto/monero.svg`,
    reserve: "9 656",
    minAmount: "500",
    maxAmount: "150 000",
  },
  {
    id: 4,
    type: "bank",
    name: "SEPA",
    network: "EUR",
    icon: `${BASE_URL}/public/images/sepa.svg`,
    reserve: "4 934 656",
    minAmount: "500",
    maxAmount: "150 000",
  },
  {
    id: 5,
    type: "bank",
    name: "WIRE",
    network: "USD",
    icon: `${BASE_URL}/public/images/wire.png`,
    reserve: "4 934 656",
    minAmount: "500",
    maxAmount: "150 000",
  },
];
