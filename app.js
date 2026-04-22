// ===============================
// Core Dependencies
// ===============================
const express = require("express");
const mongoose = require("mongoose");
// ===============================
// Utility & Config Imports
// ===============================
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// Custom utilities
const ExpressError = require("./utils/ExpressError"); // Custom error handler


const listingRouter = require("./routes/listing")
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");


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
 
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/users", userRouter);


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