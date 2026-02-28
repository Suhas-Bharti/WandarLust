const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://images.pexels.com/photos/1449767/pexels-photo-1449767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        set: (value) => {
            return value === "" ? "https://images.pexels.com/photos/1449767/pexels-photo-1449767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : value;
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reviews",
        },
    ],
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;