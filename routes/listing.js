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

// Index Route, Create Route
 router.route("/")
    .get(wrapAsync(listingsController.index)) // Index Route - Show all listings
    .post(isLoggedIn, validateListing, wrapAsync(listingsController.createListing)); // Create Route - Add new listing to database


// Create Route - Show form to create new listing
router.get("/new", isLoggedIn, listingsController.renderNewForm);

// Show Route, Update Route, Delete Route
router.route("/:id")
    .get(wrapAsync(listingsController.showListing)) // Show Route - Display single listing with populated reviews
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingsController.updateListing)) // Update Route - Update listing details
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing)); // Delete Route - Remove listing (Cascade delete handled in model middleware)

// Edit Route - Show edit form for listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.showEditForm));

module.exports = router;