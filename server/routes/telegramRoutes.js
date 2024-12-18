import express from "express";
import { sendToTelegram } from "../controllers/telegramController.js";

const router = express.Router();

router.post("/send-to-telegram", sendToTelegram);

export default router;
