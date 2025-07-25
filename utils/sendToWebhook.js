const axios = require('axios');

async function sendToWebhook(message, webhookUrl) {
  try {
    const response = await axios.post(webhookUrl, { message });
    return response.data;
  } catch (error) {
    console.error('Webhook error:', error.message);
    return { error: 'Failed to send to webhook.' };
  }
}

module.exports = sendToWebhook;
