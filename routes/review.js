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
const {validateReview} = require("../middleware"); // Validation middleware


// ===============================
// Review Routes
// ===============================

// Create Review - Add review to listing
router.post("/", validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  // Associate review with listing
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New review created!");

  res.redirect(`/listings/${listing._id}`);
}));

// Delete Review - Remove review from listing and database
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove review reference from listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete review document
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;