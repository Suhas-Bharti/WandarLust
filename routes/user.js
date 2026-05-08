const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require('../middleware');

const userController = require("../controller/users"); // Import user controller for handling signup logic


// Signup Routes
router.route("/signup")
    .get(userController.renderSignupForm) // Show signup form
    .post(wrapAsync(userController.signup)); // Handle user registration

// Login Routes
router.route("/login")
    .get(userController.renderLoginForm) // Show login form
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login); // Handle user login

// Logout Route
router.get("/logout", userController.logout);

module.exports = router;