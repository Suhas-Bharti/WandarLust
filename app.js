const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/WandarLust";
// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected on http://localhost:${PORT}`);
});