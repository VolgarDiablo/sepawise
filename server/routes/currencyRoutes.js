import express from "express";
import { currencies } from "../data/currencyData.js";

const router = express.Router();

// Маршрут для получения списка монет
router.get("/list", (req, res) => {
  res.status(200).json(currencies);
});

export default router;
