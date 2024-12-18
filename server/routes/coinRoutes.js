import express from "express";
import { currencies } from "../data/currencies.js";

const router = express.Router();

router.get("/currencies", (req, res) => {
  res.json(currencies);
});

export default router;
