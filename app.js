const express = require("express");
const mongoose = require("mongoose");

const Listing = require("./models/listing");
const path = require("path");

const app = express();
const PORT = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/WandarLust";
// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Import listing routes
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "Beautiful Beach House",
//     description: "A stunning beach house with ocean views and modern amenities.",
//     image: "",
//     price: 1200,
//     location: "Malibu",
//     country: "United States"
//   });

//   try {
//     await sampleListing.save();
//     res.send("Sample listing created successfully!");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error creating sample listing");
//   }
// });

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected on http://localhost:${PORT}`);
});