import express from "express";
import { getCurrencyPrices } from "../controllers/currencyController.js";

const router = express.Router();

// Маршрут для получения курсов валют
router.get("/currencies", getCurrencyPrices);

export default router;
