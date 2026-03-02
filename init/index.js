const mongoose = require("mongoose");
const data = require("./data").data;
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/WandarLust";

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));
 

// Clean Random data from the database
const initDB = async () => {
    await Listing.deleteMany({});
    console.log("Old data deleted.");
    await Listing.insertMany(data);
    console.log("Database initialized with data.");
};

initDB();