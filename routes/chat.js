const express = require("express");
const router = express.Router();
const axios = require("axios");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("📥 Received POST to /api/chat");
  console.log("💬 Message received:", userMessage);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are Charlene "Charlie Baltimore", a helpful assistant for Leona's Farmers Market. Answer questions and help people apply to be vendors.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    // Check for vendor intent
    const isVendorIntent = /apply.*vendor|become.*vendor|sell.*market/i.test(userMessage);

    // Send webhook if vendor intent detected
    if (isVendorIntent && process.env.WEBHOOK_URL) {
      console.log("📡 Vendor intent detected. Sending to webhook...");
      await axios.post(process.env.WEBHOOK_URL, {
        message: userMessage,
        source: "charlie",
        timestamp: new Date().toISOString(),
      });
    }

    res.json({ reply });
  } catch (error) {
    console.error("❌ OpenAI Error:", error.message);
    res.status(500).json({ error: "Charlene had a hiccup." });
  }
});

module.exports = router;
