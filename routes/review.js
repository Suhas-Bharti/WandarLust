// ===============================
// Core Dependencies
// ===============================
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({mergeParams: true});
// Custom utilities
const wrapAsync = require("../utils/wrapAsync");     // Handles async errors
const ExpressError = require("../utils/ExpressError"); // Custom error handler
const { reviewSchema } = require("../schema"); // Joi validation
const Review = require("../models/review");


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

  res.redirect(`/listings/${listing._id}`);
}));

// Delete Review - Remove review from listing and database
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove review reference from listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete review document
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));

module.exports = router;