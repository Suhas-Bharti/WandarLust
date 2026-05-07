const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema"); // Joi validation schemas
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware"); // Authentication middleware

const listingsController = require("../controller/listings");



// ===============================
// Listing Routes (CRUD)
// ===============================

// Index Route - Show all listings
router.get("/", wrapAsync(listingsController.index));

// Create Route - Show form to create new listing
router.get("/new", isLoggedIn, wrapAsync(listingsController.showNewForm));

// Show Route - Display single listing with populated reviews
router.get("/:id", wrapAsync(listingsController.showListing));

// Create Route - Add new listing to database
router.post("/", isLoggedIn, validateListing, wrapAsync(listingsController.createListing));

// Edit Route - Show edit form for listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.showEditForm));

// Update Route - Update listing details
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingsController.updateListing));

// Delete Route - Remove listing (Cascade delete handled in model middleware)
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

module.exports = router;