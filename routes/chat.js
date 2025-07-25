const express = require('express');
const router = express.Router();
const detectIntent = require('../utils/detectIntent');
const sendToWebhook = require('../utils/sendToWebhook');

router.post('/', async (req, res) => {
  const { message } = req.body;
  console.log("📥 Received message:", message);

  try {
    const reply = await detectIntent(message);
    await sendToWebhook(message, reply);
    res.json({ reply });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Charlene had a hiccup." });
  }
});

module.exports = router;
