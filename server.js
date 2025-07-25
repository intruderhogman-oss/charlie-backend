const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Log to verify webhook and API key
console.log("🔑 OPENAI key loaded:", process.env.OPENAI_API_KEY ? "[YES]" : "[NO]");
console.log("🌐 Webhook:", process.env.WEBHOOK_URL || "[Not set]");

// Route registration
const chatRoutes = require("./routes/chat");
app.use("/api", chatRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Charlene is online at http://localhost:${PORT}`);
});
