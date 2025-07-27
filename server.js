const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/submit-vendor', async (req, res) => {
  try {
    const webhookURL = 'http://148.230.84.108:5678/webhook/submit-vendor';
    const response = await axios.post(webhookURL, req.body);
    res.json({ status: 'ok', n8n: response.data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(3000, () => {
  console.log('Charlie is listening on http://localhost:3000');
});
