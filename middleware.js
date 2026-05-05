const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError"); // Custom error handler
const { listingSchema, reviewSchema } = require("./schema"); // Joi validation schemas


// ===============================
// Server-Side Validation Middleware
// ===============================
// Validate Listing data using Joi
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ===============================
// Validate Review data using Joi
// ===============================
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ===============================
// Authentication & Authorization Middleware
// ===============================
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Store the original URL to redirect after login    
        req.flash("error", "You must be logged in to do that!");
        return res.redirect("/login");
    }
    next();
};

// Middleware to make the redirect URL available in response locals for use in views
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // Make the redirect URL available in response locals
    }
    next();
};

// Middleware to check if the current user is the owner of the listing

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`); // Redirect back to the listing page if not the owner   
    }

    next();
};