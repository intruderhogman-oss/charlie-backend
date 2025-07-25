const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const detectIntent = require('./utils/detectIntent');
const sendToWebhook = require('./utils/sendToWebhook');

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const reply = await detectIntent(message);

    await sendToWebhook({
      originalMessage: message,
      chatbotReply: reply,
    });

    res.json({ reply });
  } catch (error) {
    console.error('Error handling /api/chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Charlene is online at port ${port}`);
});
