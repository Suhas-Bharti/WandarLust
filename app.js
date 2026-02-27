const express = require("express");
const mongoose = require("mongoose");

const Listing = require("./models/listing");
const path = require("path");

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");


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
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Import index(listing) routes
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
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
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));


// Create Route - Handle form submission to create a new listing
app.post("/listings", wrapAsync(async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for listing");
  }
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

// Edit Route - Show form to edit an existing listing
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

// Update Route - Handle form submission to update an existing listing  
app.put("/listings/:id", wrapAsync(async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for listing");
  }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// Delete Route - Handle deletion of a listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));

// Handle all unknown routes (404 Not Found)
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Define Middleware (Custom Error Handling)
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.send("Something went wrong!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected on http://localhost:${PORT}`);
});