const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require('../middleware');

const userController = require("../controller/users"); // Import user controller for handling signup logic

router.get("/signup", userController.renderSignupForm);

// Handle user registration - signup routes
router.post("/signup", wrapAsync(userController.signup));

// Login routes
router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);


router.get("/logout", userController.logout);

module.exports = router;