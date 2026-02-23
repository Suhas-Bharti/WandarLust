const express = require("express");
const mongoose = require("mongoose");

const Listing = require("./models/listing");
const path = require("path");

const methodOverride = require("method-override");

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Import index(listing) routes
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

// Create Route - Show form to create a new listing
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});


// Show Route details of a listing
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listing details");
  }
});


// Create Route - Handle form submission to create a new listing
app.post("/listings", async (req, res) => {
  const { title, description, image, price, location, country } = req.body;
  let newListing = new Listing({  
    title,
    description,
    image,
    price,
    location,
    country
  });
  try {
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating listing");
  }
});

// Edit Route - Show form to edit an existing listing
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listing for editing");
  } 
});

// Update Route - Handle form submission to update an existing listing  
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Listing.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating listing");
  }
});

// Delete Route - Handle deletion of a listing
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params; 
  try {
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting listing");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected on http://localhost:${PORT}`);
});