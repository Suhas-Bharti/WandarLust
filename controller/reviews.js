const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  newReview.author = req.user._id;
  console.log("New Review Author ID:", newReview.author); // Debugging line

  // Associate review with listing
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New review created!");

  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove review reference from listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete review document
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
};