const express = require('express');
const dotenv = require('dotenv');
const chatRoute = require('./routes/chat');

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Route registration
app.use('/api/chat', chatRoute);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send("Charlene is online.");
});

// ✅ Log all registered routes
console.log("✅ ROUTES:");
console.log(
  app._router.stack
    .map((r) => (r.route && r.route.path) || (r.name === 'router' && r.regexp && r.regexp.source))
    .filter(Boolean)
);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
