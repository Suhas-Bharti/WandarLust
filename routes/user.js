// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");

// Create a Schema object from mongoose
const Schema = mongoose.Schema;

// Import passport-local-mongoose plugin
// This plugin automatically adds username, password hash, and authentication methods
const passportLocalMongoose = require("passport-local-mongoose");

// Define User schema
const userSchema = new Schema({
    email: {
        type: String,        // Email will be stored as a string
        required: true,      // Email is mandatory
        unique: true         // No two users can have the same email
    },
});

// Attach passport-local-mongoose plugin to the schema
// This adds username, password hashing, salting, and helper methods like register(), authenticate()
userSchema.plugin(passportLocalMongoose);

// Export the User model so it can be used in routes/controllers
module.exports = mongoose.model("User", userSchema);