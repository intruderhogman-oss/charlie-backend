const express = require('express');
const dotenv = require('dotenv');
const chatRoute = require('./routes/chat');

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Register the chat route here
app.use('/api/chat', chatRoute);

// Simple health check route
app.get('/', (req, res) => {
  res.send("Charlene is online.");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
