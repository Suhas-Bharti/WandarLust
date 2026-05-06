const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema"); // Joi validation schemas
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware"); // Authentication middleware



// ===============================
// Listing Routes (CRUD)
// ===============================

// Index Route - Show all listings
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// Create Route - Show form to create new listing
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route - Display single listing with populated reviews
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews", populate: { path: "author" },
    })
    .populate("owner");
    if(!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}));

// Create Route - Add new listing to database
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set owner to currently logged in user
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}));

// Edit Route - Show edit form for listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// Update Route - Update listing details
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}));

// Delete Route - Remove listing (Cascade delete handled in model middleware)
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
     
    res.redirect("/listings");
}));

module.exports = router;