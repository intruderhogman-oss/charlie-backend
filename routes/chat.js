const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const sendToWebhook = require('../utils/sendToWebhook');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are Charlene, the warm and intelligent assistant for Leona’s Farmers Market. Help vendors through the onboarding process in a natural and conversational tone." },
        { role: "user", content: userMessage }
      ],
      model: "gpt-4",
    });

    const assistantReply = chatCompletion.choices[0].message.content;

    // Forward to webhook
    await sendToWebhook(userMessage, assistantReply);

    res.json({ reply: assistantReply });
  } catch (err) {
    console.error('❌ Error in /api/chat:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
