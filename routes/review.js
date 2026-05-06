// ===============================
// Core Dependencies
// ===============================
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({mergeParams: true});
// Custom utilities
const wrapAsync = require("../utils/wrapAsync");     // Handles async errors
const ExpressError = require("../utils/ExpressError"); // Custom error handler
const Review = require("../models/review");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware"); // Validation middleware
const Listing = require("../models/listing"); // For associating reviews with listings


// ===============================
// Review Routes
// ===============================

// Create Review - Add review to listing
router.post("/", validateReview, isLoggedIn, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  newReview.author = req.user._id;
  console.log("New Review Author ID:", newReview.author); // Debugging line

  // Associate review with listing
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New review created!");

  res.redirect(`/listings/${listing._id}`);
}));

// Delete Review - Remove review from listing and database
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove review reference from listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete review document
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;