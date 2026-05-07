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

const reviewController = require("../controller/reviews");


// ===============================
// Review Routes
// ===============================

// Create Review - Add review to listing
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

// Delete Review - Remove review from listing and database
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;