const express = require("express");

const app = express();
const PORT = 8080;

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected on http://localhost:${PORT}`);
});