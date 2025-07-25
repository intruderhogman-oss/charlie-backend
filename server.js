const express = require('express');
const dotenv = require('dotenv');
const chatRoute = require('./routes/chat');

dotenv.config();

const app = express();
app.use(express.json());

// Register the /api/chat route
app.use('/api/chat', chatRoute);

// Health check
app.get('/', (req, res) => {
  res.send('Charlene is online.');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
