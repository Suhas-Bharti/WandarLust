// ===============================
// Core Dependencies
// ===============================
const express = require("express");
const mongoose = require("mongoose");

// ===============================
// Models
// ===============================
const Review = require("./models/review");

// ===============================
// Utility & Config Imports
// ===============================
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Custom utilities
const wrapAsync = require("./utils/wrapAsync");     // Handles async errors
const ExpressError = require("./utils/ExpressError"); // Custom error handler
const { listingSchema, reviewSchema } = require("./schema"); // Joi validation schemas

const { wrap } = require("module"); // (Currently unused)

const listings = require("./routes/listing")


// ===============================
// App Configuration
// ===============================
const app = express();
const PORT = 8080;

// MongoDB connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/WandarLust";

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));


// ===============================
// View Engine & Middleware Setup
// ===============================

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable PUT & DELETE methods from forms
app.use(methodOverride("_method"));

// Use EJS-Mate for layout support
app.engine("ejs", ejsMate);

// Serve static files
app.use(express.static(path.join(__dirname, "/public")));


// ===============================
// Routes
// ===============================

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});


// ===============================
// Server-Side Validation Middleware
// ===============================


// Validate Review data using Joi
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


app.use("/listings", listings);


// ===============================
// Review Routes
// ===============================

// Create Review - Add review to listing
app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  // Associate review with listing
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
}));

// Delete Review - Remove review from listing and database
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove review reference from listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete review document
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));


// ===============================
// Error Handling
// ===============================

// Handle unknown routes (404)
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});


// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`Server connected on http://localhost:${PORT}`);
});