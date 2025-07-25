const express = require('express');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chat');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

// Register the chat route
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`🌐 Webhook: ${process.env.WEBHOOK_URL}`);
  console.log(`Charlene is online at http://localhost:${PORT}`);
});
